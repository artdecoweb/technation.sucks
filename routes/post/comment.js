/** @type {import('../..').Middleware} */
export default async (ctx) => {
  // debugger
  let { photo, csrf, name, comment } = ctx.request.body

  let linkedin_user, github_user
  if (csrf) {
    const c = ctx.session.csrf
    linkedin_user = ctx.session.linkedin_user
    github_user = ctx.session.github_user
    // { csrf: c, linkedin_user } = ctx.session
    if (csrf != c) throw new Error('CSRF does not match.')
  }
  validatePhoto(photo, ctx.session)

  if (!comment) throw new Error('Comment is a required field.')
  const Comments = ctx.mongo.collection('comments')

  const res = await Comments.insertOne({
    linkedin_user,
    github_user,
    name,
    comment,
    photo,
    date: new Date(),
  })

  ctx.body = { ok: res.result.ok, id: res.insertedId }
}

/**
 * @param {Auth} auth
 */
const validatePhoto = (photo, { linkedin_user, github_user }) => {
  if (!photo) return
  let photoValidated = false

  if (linkedin_user && linkedin_user.profilePicture == photo) {
    photoValidated = true
  } else if (github_user && github_user.avatar_url == photo) {
    photoValidated = true
  }
  if (!photoValidated) throw new Error('Unknown photo')
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').Auth} Auth
 */

export const middleware = (route) =>
  ['session', 'nicer', route]