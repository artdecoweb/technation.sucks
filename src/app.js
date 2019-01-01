import idio from '@idio/core'
import { Client } from 'elasticsearch'
import { c } from 'erte'
import staticCache from 'koa-static-cache'
import linkedIn, { query, getUser, linkedInButton } from '@idio/linkedin'
import dotenv from '@demimonde/dotenv'
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
  const files = {}
  const opt = {
    gzip: true,
  }
  const sc = staticCache('static', opt, files)
  staticCache('node_modules/@idio/linkedin/img', opt, files)
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
  app.use(router.routes())
  app.use((ctx) => {
    ctx.redirect('https://www.technation.sucks')
  })

  console.log('Started on %s', c(url, 'green'))
})()