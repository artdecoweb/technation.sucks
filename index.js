const idio = require('@idio/core')
const { Client } = require('elasticsearch');
const { sync } = require('uid-safe');
const { readBuffer } = require('@wrote/read')

const client = new Client({
  host: '13.81.242.64:9200',
})


/** @type {import('koa').Middleware} */
const es = async (ctx, next) => {
  let e; try { await next() } catch (err) { e = err }
  const {
    appName: app, request: { ip, path }, headers: { cookie, ...headers },
    client, status,
  } = ctx
  const body = {
    app,
    ip,
    path,
    headers,
    status,
    date: new Date(),
  }
  const d = new Date()
  const y = d.getFullYear()
  const m = d.getMonth() + 1

  const id = sync(18)
  client.create({
    index: `technation.sucks-${y}.${m}`,
    type: 'hit',
    id,
    body,
  }).catch(() => {
    console.log('ES PUT ERROR')
  })
  console.log(path,id)

  if (e) throw e
}

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
      if (ctx.path == '/reflex.png') {
	ctx.type = 'image/png'
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
