import idio from '@idio/core'
import initRoutes, { watchRoutes } from '@idio/router'
import staticCache from 'koa-static-cache'
import linkedIn from '@idio/linkedin'
import cors from '@koa/cors'
import { makeLinkedinFinish } from './lib'
import es from './es'

const PROD = process.env.NODE_ENV == 'production'

/**
 * Starts the server.
 */
export default async ({
  client, port, client_id, client_secret,
  watch = !PROD,
}) => {
  const sc = staticCache('static', {
    gzip: true,
  })
  const c = cors({
    origin(ctx) {
      const origin = ctx.get('Origin')
      const found = [
        'http://localhost:5000',
        'http://localhost:5001',
        'https://www.technation.sucks',
        'https://technation.sucks',
      ].find(a => a == origin)
      return found
    },
    credentials: true,
  })
  const { app, router, url, middleware } = await idio({
    c,
    logger: {
      use: PROD,
    },
    es,
    sc,
    /** @type {import('koa').Middleware} */
    async sourceMaps(ctx, next) {
      if (ctx.path.endsWith('.js'))
        ctx.set('SourceMap', `${ctx.path}.map`)
      await next()
    },
    static: { use: true, root: 'closure' },
    session: { keys: [process.env.SESSION_KEY] },
    bodyparser: {},
  }, { port })
  Object.assign(app.context, {
    client, appName: 'technation.sucks',
  })
  const li = {
    session: middleware.session,
    client_id,
    client_secret,
    scope: 'r_liteprofile,r_basicprofile',
  }
  linkedIn(router, {
    ...li,
    finish: makeLinkedinFinish('/comments'),
  })
  linkedIn(router, {
    ...li,
    error(ctx, error) {
      ctx.redirect(`/callback?error=${error}`)
    },
    path: '/linkedin',
    finish: makeLinkedinFinish('/callback'),
  })
  const w = await initRoutes(router, 'routes', {
    middleware,
  })
  if (watch) watchRoutes(w)
  app.use(router.routes())
  app.use((ctx) => {
    ctx.redirect('https://www.technation.sucks')
  })
  return { app, url }
}