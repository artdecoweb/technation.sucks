export default (ctx) => {
  ctx.session = null
  ctx.body = { ok: 1 }
}

export const middleware = (route) =>
  ['session', 'bodyparser', 'csrf', route]