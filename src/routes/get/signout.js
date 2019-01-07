export default (ctx) => {
  ctx.session = null
  ctx.redirect('/comments')
}

export const middleware = (route) => {
  return ['session', route]
}