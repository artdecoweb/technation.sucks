import { sync } from 'uid-safe'

/** @type {import('koa').Middleware} */
const es = async (ctx, next) => {
  const { client, appName: app } = ctx
  if (!client) {
    await next()
    return
  }
  let e; try { await next() } catch (err) { e = err }
  const {
    request: { ip, path },
    headers: {
      cookie, // eslint-disable-line no-unused-vars
      ...headers
    },
    status,
  } = ctx
  const date = new Date()
  const body = {
    app,
    ip,
    path,
    headers,
    status,
    date,
  }
  const y = date.getFullYear()
  const m = date.getMonth() + 1

  const id = sync(18)
  client.create({
    index: `${app}-${y}.${m}`,
    type: 'hit',
    pipeline: 'info',
    id,
    body,
  }).catch(() => {
    console.log('ES PUT ERROR')
  })
  // console.log(path, id)

  if (e) throw e
}

export default es
