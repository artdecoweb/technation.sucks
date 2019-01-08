import idio from '@idio/core'
import initRoutes, { watchRoutes } from '@idio/router'
import staticCache from 'koa-static-cache'
import linkedIn, { query, getUser } from '@idio/linkedin'
import es from './es'

const PROD = process.env.NODE_ENV == 'production'

const makeLinkedinFinish = (redirect) => {
  return async (ctx, token, user) => {
    const { positions: { values: pos } } = await query({
      token,
      path: 'people/~:(positions)',
      version: 'v1',
    })
    const positions = pos.map(({
      title,
      company: { id, name },
      location: { name: location } ,
    }) => {
      return {
        id, name, title,
        location: location.replace(/,\s*$/, ''),
      }
    })
    ctx.session.positions = positions
    ctx.session.token = token
    ctx.session.user = getUser(user)
    ctx.redirect(redirect)
  }
}

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
    logger: {
      use: PROD,
    },
    es,
    sc,
    static: { use: true, root: 'static2' },
    session: { keys: [process.env.SESSION_KEY] },
    bodyparser: {},
    csrfToken: {
      middlewareConstructor() {
        return async (ctx, next) => {
          ctx.request.body = ctx.request.body || {}
          ctx.request.body._csrf = ctx.req.body._csrf
          await next()
        }
      },
    },
    csrf: {},
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
  const w = await initRoutes(router, undefined, {
    middleware,
  })
  if (watch) watchRoutes(w)
  app.use(router.routes())
  app.use((ctx) => {
    ctx.redirect('https://www.technation.sucks')
  })
  return { app, url }
}