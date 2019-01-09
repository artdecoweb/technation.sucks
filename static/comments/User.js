/* eslint-env browser */
const { h } = window.preact

const signOut = async (csrf) => {
  const r = await fetch('/signout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ csrf }),
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
}, csrf, onSignout = () => {} }) => {
  return h('div', { class: 'CommentsUser' },
    h('img', { src: profilePicture, width: 50 }),
    ` Hello, ${firstName} ${lastName}! `,
    h('a', { href: '#', async onclick() {
      const res = await signOut(csrf)
      if (res) alert(`Could not sign out: ${res}. Please refresh the page and try again. Alternatively, clear your cookies.`)
      else onSignout()
    } }, 'Sign Out')
  )
}

export default User