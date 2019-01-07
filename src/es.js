import { sync } from 'uid-safe'

/** @type {import('koa').Middleware} */
const es = async (ctx, next) => {
  const {
    appName: app, request: { ip, path }, headers: { cookie, ...headers },
    client, status,
  } = ctx
  if (!client) {
    await next()
    return
  }
  let e; try { await next() } catch (err) { e = err }
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

export default es
