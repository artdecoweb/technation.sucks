import idio from '@idio/core'
import { Client } from 'elasticsearch'
import { c } from 'erte'
import es from './es'

const host = `${process.env.ELASTIC}:9200`
const PROD = process.env.NODE_ENV == 'production'

const client = new Client({
  host,
})

const MIN = 1000 * 60
const HOUR = 60 * MIN
const DAY = 24 * HOUR

;(async () => {
  await client.ping()
  console.log('Connected to %s', c(host, 'red'))
  const { app, url } = await idio({
    async setup(ctx, next) {
      ctx.client = client
      ctx.index = 'technation.sucks'
      ctx.appName = 'technation.sucks'
      await next()
    },
    es,
    compress: {
      use: true,
    },
    static: {
      use: true,
      root: 'static',
      config: {
        maxage: PROD ? 7 * DAY : 0,
      },
    },
    redirect(ctx) {
      ctx.redirect('https://www.technation.sucks')
    },
  })
  console.log('Started on %s', c(url, 'green'))
})()
