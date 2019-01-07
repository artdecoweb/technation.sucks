import { linkedInButton } from '@idio/linkedin'

export default async (ctx, next) => {
  const { button, idioCommon, style } = await linkedInButton()
  ctx.body = `<style>
    ${idioCommon}
    ${style}
  </style>
  ${button}
  `
}