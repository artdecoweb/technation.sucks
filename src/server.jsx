import idio from '@idio/core'
import render from '@depack/render'
import initRoutes, { watchRoutes } from '@idio/router'
import staticCache from 'koa-static-cache'
import linkedIn from '@idio/linkedin'
import { makeLinkedinFinish } from './lib'
import logarithm from 'logarithm'
import DefaultLayout from '../layout'

const {
  NODE_ENV,
  HOST = 'https://technation.sucks',
  API = 'https://api.technation.sucks',
  FRONT_END = 'https://www.technation.sucks',
  CLOSURE, // for /comments page
  SESSION_KEY,
} = process.env
const PROD = NODE_ENV == 'production'

/**
 * Starts the server.
 */
export default async ({
  client, port, client_id, client_secret,
  watch = !PROD, elastic,
}) => {
  const { app, router, url, middleware } = await idio({
    cors: {
      use: true,
      origin: PROD && [API, FRONT_END, HOST, 'http://localhost:5001'],
      config: { credentials: true },
    },
    logger: { use: !PROD },
    compress: { use: true },
    logarithm: {
      middlewareConstructor() {
        const l = logarithm({
          app: 'technation.sucks',
          url: elastic,
        })
        return l
      },
      use: true,
    },
    frontend: {},
    multerSingle: {
      middlewareConstructor() {
        return async (...args) => {
          const mw = middleware.multer.single('image')
          await mw(...args)
        }
      },
    },
    multer: { config: {
      dest: 'upload',
    } },
    sc: staticCache('static'),
    static: { use: true, root: 'closure' },
    session: { keys: [SESSION_KEY] },
    bodyparser: {},
  }, { port })

  Object.assign(app.context, {
    prod: PROD,
    HOST: PROD ? HOST : url,
    CLOSURE: PROD || CLOSURE,
    client, appName: 'technation.sucks',
    render: (vnode, props = {}, Layout = DefaultLayout) => {
      return render(<Layout {...props}>
        {vnode}
      </Layout>, {
        addDoctype: true,
        pretty: true,
      })
    },
  })

  if (CLOSURE)
    console.log('Testing Closure bundle: %s', 'closure/comments.js')
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

// /** @type {import('koa').Middleware} */
// async sourceMaps(ctx, next) {
//   if (!ctx.path.endsWith('.js')) return await next()
//   try {
//     const file = await read(join('closure', ctx.path))
//     const f = `${file}\n//# sourceMappingURL=${ctx.path}.map`
//     ctx.type = 'application/javascript'
//     ctx.body = f
//   } catch (err) {
//     await next()
//   }
// },

// if (!enabled.includes(d)) return await next()