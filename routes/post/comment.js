/** @type {import('../..').Middleware} */
export default (ctx) => {
  // debugger
  console.log(ctx.request.body)
  ctx.body = { ok: 1 }
}

export const middleware = (route) =>
  ['session', 'nicer', route]