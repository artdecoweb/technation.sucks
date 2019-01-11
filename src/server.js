import idio from '@idio/core'
import initRoutes, { watchRoutes } from '@idio/router'
import staticCache from 'koa-static-cache'
import linkedIn from '@idio/linkedin'
import { join } from 'path'
import read from '@wrote/read'
import transpileJSX from '@a-la/jsx'
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
  const { app, router, url, middleware } = await idio({
    cors: {
      use: true,
      origin: PROD ? [
        'https://www.technation.sucks',
        'https://technation.sucks',
      ]: '*',
      config: {
        credentials: true,
      },
    },
    logger: {
      use: PROD,
    },
    es,
    /** @type {import('koa').Middleware} */
    async jsx(ctx, next) {
      if (!ctx.path.endsWith('.jsx')) {
        await next()
        return
      }
      const p = join('frontend', ctx.path)
      const r = await read(p)
      const jsx = transpileJSX(r)
      ctx.type = 'text/javascript'
      ctx.body = jsx
    },
    sc,
    /** @type {import('koa').Middleware} */
    async sourceMaps(ctx, next) {
      if (ctx.path.endsWith('.js'))
        ctx.set('SourceMap', `${ctx.path}.map`)
      await next()
    },
    static: { use: true, root: ['closure', 'frontend'] },
    session: { keys: [process.env.SESSION_KEY] },
    bodyparser: {},
  }, { port })
  Object.assign(app.context, {
    prod: PROD,
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