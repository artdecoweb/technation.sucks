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
const BACK_END = 'https://technation.sucks'
const FRONT_END = 'https://www.technation.sucks'
const USE_CLOSURE = process.env.USE_CLOSURE
const closureBundle = PROD ? `${BACK_END}/comments.js` : '/bundle.js'

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
      origin: PROD && [FRONT_END, BACK_END],
      config: { credentials: true },
    },
    logger: { use: !PROD },
    es,
    ...(!PROD ? {
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
    } : {}),
    sc,
    /** @type {import('koa').Middleware} */
    async sourceMaps(ctx, next) {
      if (!ctx.path.endsWith('.js')) return await next()
      try {
        const file = await read(join('closure', ctx.path))
        const f = `${file}\n//# sourceMappingURL=${ctx.path}.map`
        ctx.type = 'application/javascript'
        ctx.body = f
      } catch (err) {
        await next()
      }
    },
    static: { use: true, root: ['closure', 'frontend'] },
    session: { keys: [process.env.SESSION_KEY] },
    bodyparser: {},
  }, { port })
  Object.assign(app.context, {
    prod: PROD,
    USE_CLOSURE: PROD || USE_CLOSURE,
    closureBundle,
    client, appName: 'technation.sucks',
  })
  if (USE_CLOSURE) console.log('Testing Closure bundle: %s', closureBundle)
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
    ctx.redirect(FRONT_END)
  })
  return { app, url }
}