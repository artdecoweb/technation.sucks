export default (ctx) => {
  const { csrf, user } = ctx.session
  if (!user) {
    ctx.body = { error: 'not signed in' }
    ctx.status = 400
    return
  }
  const { csrf: c } = ctx.request.body
  if (csrf != c) {
    ctx.body = { error: 'invalid csrf token' }
    ctx.body = 401
    return
  }
  ctx.session = null
  ctx.body = { ok: 1 }
}

export const middleware = (route) =>
  ['session', 'bodyparser', route]