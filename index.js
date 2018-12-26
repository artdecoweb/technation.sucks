const idio = require('@idio/core')
const { Client } = require('elasticsearch');
const { sync } = require('uid-safe');

const client = new Client({
  host: 'docks.cc:9200',
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

  client.create({
    index: `technation.sucks-${y}.${m}`,
    type: 'hit',
    id: sync(18),
    body,
  }).catch(() => {
    console.log('ES PUT ERROR')
  })

  if (e) throw e
}

;(async () => {
  const { app, url } = await idio({
    async setup() {
      ctx.client = client
      ctx.index = 'technation.sucks'
      ctx.appName = 'technation.sucks'
    },
    compress: {
      use: true,
    },
    es,
    async img(ctx, next) {
      await next()
    },
    redirect(ctx) {
      ctx.redirect('https://www.technation.sucks')
    },
  })
  console.log(url)
})()
