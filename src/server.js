import idio from '@idio/core'
import initRoutes, { watchRoutes } from '@idio/router'
import staticCache from 'koa-static-cache'
import linkedIn from '@idio/linkedin'
import { join } from 'path'
import read from '@wrote/read'
import transpileJSX from '@a-la/jsx'
import { Replaceable } from 'restream'
import { collect } from 'catchment'
import { relative } from 'path'
import { resolveDependency } from 'depack'
import { makeLinkedinFinish } from './lib'
import es from './es'

const {
  NODE_ENV,
  HOST = 'https://technation.sucks',
  FRONT_END = 'https://www.technation.sucks',
  CLOSURE, // for /comments page
} = process.env
const PROD = NODE_ENV == 'production'

/**
 * Starts the server.
 */
export default async ({
  client, port, client_id, client_secret,
  watch = !PROD,
}) => {
  const { app, router, url, middleware } = await idio({
    cors: {
      use: true,
      origin: PROD && [FRONT_END, HOST, 'http://localhost:5001'],
      config: { credentials: true },
    },
    logger: { use: !PROD },
    compress: { use: true },
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
        const body = await patchSource(p, jsx)
        ctx.type = 'text/javascript'
        ctx.body = body
      },
    } : {}),
    /** @type {import('koa').Middleware} */
    async nodeModulesPath(ctx, next) {
      const enabled = ['preact-richtextarea']
      const p = ctx.path.replace('/', '')
      if (ctx.path.endsWith('.css')) {
        const f = await read(p)
        const js = `
function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
const style = \`${f}\`
__$styleInject(style)`
        ctx.type = 'application/javascript'
        ctx.body = js
        return
      }
      if (ctx.path.startsWith('/node_modules')) {
        const [, d] = /^\/node_modules\/(.+?)\//.exec(ctx.path) || []
        if (!enabled.includes(d)) return await next()
        const f = await read(p)
        const ff = transpileJSX(f, { quoteProps: 1 })
        const body = await patchSource(p, ff)
        ctx.type = 'application/javascript'
        ctx.body = body
      } else {
        await next()
      }
    },
    sc: staticCache('static'),
    static: [{ use: true, root: ['closure', 'frontend'] },
      { use: true, root: 'node_modules', mount: '/node_modules' }],
    session: { keys: [process.env.SESSION_KEY] },
    bodyparser: {},
  }, { port })
  Object.assign(app.context, {
    prod: PROD,
    HOST: PROD ? HOST : url,
    CLOSURE: PROD || CLOSURE,
    client, appName: 'technation.sucks',
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

const patchSource = async (path, source) => {
  const rs = new Replaceable([
    {
      re: /^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm,
      async replacement(m, pre, from) {
        if (/[/.]/.test(from)) {
          const rd = await resolveDependency(path, from)
          return `${pre}'${rd}'`
        }
        const { module: mod } = require(`${from}/package.json`)
        if (!mod) {
          console.warn('[↛] Package %s does not specify module in package.json, trying src', from)
          const d = getDep(from, 'src', pre)
          return d
        }
        return getDep(from, mod, pre)
      },
    },
  ])
  rs.end(source)
  const body = await collect(rs)
  return body
}

const getDep = (from, path, pre) => {
  const modPath = require.resolve(`${from}/${path}`)
  const modRel = relative('', modPath)
  return `${pre}'/${modRel}'`
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