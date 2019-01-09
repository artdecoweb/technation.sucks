/* eslint-env browser */
const { h } = window.preact

const signOut = async (host, csrf) => {
  const r = await fetch(`${host}/signout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ csrf }),
    credentials: 'include',
  })
  try {
    const { error } = await r.json()
    if (error) return error
  } catch (err) {
    return 'unknown error'
  }
}

const User = ({ user: {
  profilePicture, firstName, lastName,
}, csrf, onSignout = () => {}, host }) => {
  return h('div', { class: 'CommentsUser' },
    h('img', { src: profilePicture, width: 50 }),
    ` Hello, ${firstName} ${lastName}! `,
    h('a', { href: '#', async onclick() {
      const res = await signOut(host, csrf)
      if (res) alert(`Could not sign out: ${res}. Please refresh the page and try again. Alternatively, clear your cookies.`)
      else onSignout()
    } }, 'Sign Out')
  )
}

export default User