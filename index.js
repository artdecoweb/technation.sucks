const idio = require('@idio/core')
const { Client } = require('elasticsearch');
const { readBuffer } = require('@wrote/read')
const es = require('./es')

const client = new Client({
  host: '13.81.242.64:9200',
})

;(async () => {
  await client.ping()
  const img = await readBuffer('reflex.png')
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
  console.log(url)
})()
