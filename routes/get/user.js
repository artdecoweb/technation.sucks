export default (ctx) => {
  const { user, csrf } = ctx.session
  ctx.body = {
    user,
    csrf,
  }
}

export const middleware = ['session']