import idio from '@idio/core'
import { Client } from 'elasticsearch'
import { c } from 'erte'
import staticCache from 'koa-static-cache'
import es from './es'

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
  const { url } = await idio({
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
    redirect(ctx) {
      ctx.redirect('https://www.technation.sucks')
    },
  }, { port: process.env.PORT })
  console.log('Started on %s', c(url, 'green'))
})()
