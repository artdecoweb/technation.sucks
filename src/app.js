import idio from '@idio/core'
import { Client } from 'elasticsearch'
import { c } from 'erte'
import staticCache from 'koa-static-cache'
import linkedIn, { query, getUser, linkedInButton } from '@idio/linkedin'
import dotenv from '@demimonde/dotenv'
import counter from './routes/counter'
import es from './es'
dotenv()

const host = `${process.env.ELASTIC}:9200`
const PROD = process.env.NODE_ENV == 'production'

const client = new Client({
  host,
})

;(async () => {
  await client.ping()
  console.log('Connected to %s', c(host, 'red'))
  const sc = staticCache('static', {
    gzip: true,
  })
  const { app, router, url } = await idio({
    logger: {
      use: PROD,
    },
    async setup(ctx, next) {
      ctx.client = client
      ctx.index = 'technation.sucks'
      ctx.appName = 'technation.sucks'
      await next()
    },
    es,
    sc,
    session: { use: true, keys: [process.env.SESSION_KEY] },
  }, { port: process.env.PORT })
  linkedIn(router, {
    client_id: process.env.LINKEDIN_ID,
    client_secret: process.env.LINKEDIN_SECRET,
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
  router.get('/comments', async (ctx, next) => {
    const { button, idioCommon, style } = await linkedInButton()
    ctx.body = `<style>
      ${idioCommon}
      ${style}
    </style>
    ${button}
    `
  })
  router.get('/counter.svg', counter)
  router.get('/linkedin1', (ctx) => {
    if (!/LinkedInBot/.test(ctx.headers['user-agent'])) {
      ctx.redirect('https://www.technation.sucks/#check')
      return
    }
    ctx.body = `<!doctype html>
<html lang="en">
  <head>
    <meta property="og:title" content="Tech Nation Sucks: How the Senior Manager thought they could lie to the Home Office by making the decision on my application themselves." />
    <meta name="author" content="Art Deco" />
    <meta property="og:image" content="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/linkedin/key-linkedin.png" />
  </head>
</html>`
  })
  app.use(router.routes())
  // app.use((ctx) => {
  //   if(ctx.path.startsWith('/linkedin/')) {
  //     const s = ctx.path.replace('/linkedin/', '')
  //   }
  // })
  app.use((ctx) => {
    ctx.redirect('https://www.technation.sucks')
  })

  console.log('Started on %s', c(url, 'green'))
})()