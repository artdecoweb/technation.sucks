/* eslint-env browser */
import { Component, render } from 'preact'
import CommentForm from './Form'
// import { test } from '/update.js'
import LinkedIn from './LinkedIn'
import GitHub from './GitHub'
import User from './User'
import List from './List'
import callbackFetch from '../fetch'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      error: null,
      /** @type {!Auth} */
      auth: {},
    }
    this.pml = /** @type {function(!Event)} */(this.postMessageListener.bind(this))

    this.list = null

    window.addEventListener('message', this.pml, false)
  }
  componentDidMount() {
    this.auth()
  }
  auth() {
    this.setState({ loading: true })
    callbackFetch(`${this.props.host}/auth`, (error, res) => {
      this.setState({ loading: false })
      if (error) {
        return this.setState({ error })
      }
      const auth = res.json()
      this.setState({ auth })
    }, {
      credentials: 'include',
    })
  }
  /**
   * @param {!MessageEvent} event
   */
  postMessageListener(event) {
    const { data, origin } = event
    if (origin != this.props.host) return
    if (data == 'signedin') this.auth()
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.pml)
  }
  render() {
    return (<div>
      <AppUser error={this.state.error} loading={this.state.loading} auth={this.state.auth} host={this.props.host} onSignOut={() => {
        this.setState({ auth: {} })
      }} />

      <CommentForm path={`${this.props.host}/comment`} auth={this.state.auth} submitFinish={async (res) => {
        const { 'error': error, id } = await res.json()
        if (!error && id) {
          if (this.list) this.list.fetch(id)
        }
      }} />

      <List host={this.props.host} ref={(e) => {
        this.list = e
      }} />

    </div>)
  }
}

/**
 * @param {Object} props
 * @param {Auth} props.auth
 */
const AppUser = ({ error, loading, auth, onSignOut, host }) => {
  if (error)
    return (<div>Error: {error}</div>)
  if (loading)
    return (<div>Loading...</div>)
  // if (!auth.user)
  const loggedIn = auth.linkedin_user || auth.github_user
  return (<div>
    {!loggedIn && <span style="display:block">To display the profile image and validate your GitHub profile, sign in. No advanced permissions are required other than default ones (no email). Your public LinkedIn ID remains unknown. You will not be able to delete/edit your comment as a guest. <a href="/privacy-policy.html">Privacy Policy</a></span>}

    <User auth={auth} onSignout={onSignOut} host={host}/>

    {!auth.linkedin_user && <LinkedIn host={host}/>}
    {!auth.linkedin_user && ' '}
    {!auth.github_user && <GitHub host={host} />}

  </div>)
}

{/* <button onClick={() => {
  const src = `/update.js?ts=${new Date().getTime()}`
  const script = document.createElement('script')
  script.type = 'module'
  script.src = src
  document.body.appendChild(script)
}}>Update</button>
<button onClick={() => {
  // test()
  debugger
}}>Test</button> */}

window['comments'] = ({
  'host': host = 'https://api.technation.sucks', 'container': container = 'preact',
}) => {
  render(<App host={host}/>, document.getElementById(container))
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Auth} Auth
 */
