/* eslint-env browser */
const { h } = window.preact
import callbackFetch from './fetch.js'

const signOut = (host, csrf, cb) => {
  callbackFetch(`${host}/signout`, (err, res) => {
    if (err) return cb(err.message)
    const { error } = res.json()
    cb(error)
  }, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ csrf }),
    credentials: 'include',
  })
}

const User = ({ user: {
  profilePicture, firstName, lastName,
}, csrf, onSignout = () => {}, host }) => {
  return h('div', { class: 'CommentsUser' },
    h('img', { src: profilePicture, width: 50 }),
    ` Hello, ${firstName} ${lastName}! `,
    h('a', { href: '#', onclick(e) {
      e.preventDefault()
      signOut(host, csrf, (err) => {
        if (err) alert(`Could not sign out: ${err}. Please refresh the page and try again. Alternatively, clear your cookies.`)
        else onSignout()
      })
      return false
    } }, 'Sign Out')
  )
}

export default User