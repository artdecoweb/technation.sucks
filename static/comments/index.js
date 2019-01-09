/* eslint-env browser */
import LinkedIn from './LinkedIn.js'
import User from './User.js'
import callbackFetch from './fetch.js'

const { Component, h, render } = window.preact

const HOST = 'http://localhost:5000'

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
  componentDidMount() {
    this.auth()
  }
  auth() {
    this.setState({ loading: true })
    callbackFetch(`${this.props.host}/user`, (error, res) => {
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
   * @param {MessageEvent} event
   */
  postMessageListener(event) {
    const { data, origin } = event
    if (origin != this.props.host) return
    if (data == 'linkedin-signedin') this.auth()
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.postMessageListener)
  }
  render() {
    if (this.state.error)
      return h('div', null, 'Error', this.state.error ? `: ${this.state.error}` : '')
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