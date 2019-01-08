export default (ctx) => {
  const { user, positions } = ctx.session
  const { csrf } = ctx
  ctx.body = {
    user,
    positions,
    csrf,
  }
}

export const middleware = (route) => ['session', 'csrf', route]