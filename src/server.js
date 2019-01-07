import idio from '@idio/core'
import initRoutes from '@idio/router'
import staticCache from 'koa-static-cache'
import linkedIn, { query, getUser } from '@idio/linkedin'
import es from './es'

const PROD = process.env.NODE_ENV == 'production'

/**
 * Starts the server.
 */
export default async ({ client, port, client_id, client_secret }) => {
  const sc = staticCache('static', {
    gzip: true,
  })
  const { app, router, url, middleware } = await idio({
    logger: {
      use: PROD,
    },
    es,
    sc,
    session: { keys: [process.env.SESSION_KEY] },
  }, { port })
  Object.assign(app.context, {
    client, appName: 'technation.sucks',
  })
  linkedIn(router, {
    session: middleware.session,
    client_id,
    client_secret,
    scope: 'r_liteprofile,r_basicprofile',
    async finish(ctx, token, user) {
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
      ctx.redirect('/comments')
    },
  })
  await initRoutes(router, undefined, {
    middleware,
  })
  app.use(router.routes())
  app.use((ctx) => {
    ctx.redirect('https://www.technation.sucks')
  })
  return { app, url }
}