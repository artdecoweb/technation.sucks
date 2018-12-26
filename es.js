const { sync } = require('uid-safe');

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
    pipeline: 'info',
    id,
    body,
  }).catch(() => {
    console.log('ES PUT ERROR')
  })
  console.log(path,id)

  if (e) throw e
}

module.exports = es
