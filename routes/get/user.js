export default (ctx) => {
  const { user, positions, csrf } = ctx.session
  ctx.body = {
    user,
    positions,
    csrf,
  }
}

export const middleware = (route) => ['session', route]