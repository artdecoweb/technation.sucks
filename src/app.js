import idio from '@idio/core'
import { Client } from 'elasticsearch'
import { readBuffer } from '@wrote/read'
import { c } from 'erte'
import es from './es'

const host = `${process.env.ELASTIC}:9200`

const client = new Client({
  host,
})

;(async () => {
  await client.ping()
  console.log('Connected to %s', c(host, 'red'))
  const img = await readBuffer('reflex.jpg')
  const { app, url } = await idio({
    async setup(ctx, next) {
      ctx.client = client
      ctx.index = 'technation.sucks'
      ctx.appName = 'technation.sucks'
      await next()
    },
    compress: {
      use: true,
    },
    es,
    async img(ctx, next) {
      if (ctx.path == '/reflex.jpg') {
        ctx.type = 'image/jpeg'
        ctx.body = img
      } else {
        await next()
      }
    },
    redirect(ctx) {
      ctx.redirect('https://www.technation.sucks')
    },
  })
  console.log('Started on %s', c(url, 'green'))
})()
