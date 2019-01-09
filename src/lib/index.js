import { sync } from 'uid-safe'
import { query, getUser } from '@idio/linkedin'

export const makeLinkedinFinish = (redirect) => {
  return async (ctx, token, user) => {
    const { positions: { values: pos } } = await query({
      token,
      path: 'people/~:(positions)',
      version: 'v1',
    })
    const positions = pos.map(({
      title,
      company: { id, name },
      location: { name: location } ,
    }) => {
      return {
        id, name, title,
        location: location.replace(/,\s*$/, ''),
      }
    })
    ctx.session.positions = positions
    ctx.session.token = token
    ctx.session.user = getUser(user)
    ctx.session.csrf = sync(18)
    ctx.redirect(redirect)
  }
}