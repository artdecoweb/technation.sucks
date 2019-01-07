import { linkedInButton } from '@idio/linkedin'

export default async (ctx, next) => {
  const { user } = ctx.session
  if (!user) {
    const { button, idioCommon, style } = await linkedInButton()
    ctx.body = `<style>
      ${idioCommon}
      ${style}
    </style>
    ${button}`
    return
  }
  const img = `<img src="${user.profilePicture}" width="50">`
  ctx.body = `
  <div class="User">
    ${img} Hello, ${user.firstName} ${user.lastName}!
    <a href="/signout">Sign out</a>
  </div>`
}