/* eslint-env browser */
import LinkedIn from './comments/LinkedIn.js'
import User from './comments/User.js'
import fetch2 from './comments/fetch.js'

if (!('fetch' in window)) window.fetch = fetch2

const { Component, h, render } = window.preact

const HOST = 'http://localhost:5000'

const getUser = async (host) => {
  const r = await fetch(`${host}/user`, {
    credentials: 'include',
  })
  const j = await r.json()
  return j
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      error: null,
      auth: {},
    }
    this.postMessageListener = this.postMessageListener.bind(this)
    window.addEventListener('message', this.postMessageListener, false)
  }
  async componentDidMount() {
    try {
      await this.auth()
    } catch ({ message: error }) {
      this.setState({ error })
    }
    this.setState({
      loading: false,
    })
  }
  async auth() {
    const auth = await getUser(this.props.host)
    this.setState({
      auth,
    })
  }
  /**
   * @param {MessageEvent} event
   */
  async postMessageListener(event) {
    const { data, origin } = event
    if (origin != this.props.host) return
    if (data == 'linkedin-signedin')
      await this.auth()
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.postMessageListener)
  }
  render() {
    if (this.state.error)
      return h('div', null, 'Error: ', this.state.error)
    if (this.state.loading)
      return h('div', null, 'Loading...')
    //return <div>Loading...</div>
    if (!this.state.auth.user)
      return h('div', null, h(LinkedIn, { host: this.props.host }))
    return h('div', null, h(User, {
      ...this.state.auth,
      onSignout: () => {
        this.setState({
          auth: {},
        })
      },
      host: this.props.host,
    }))
  }
}

render(h(App, { host: HOST }), document.getElementById('preact'))