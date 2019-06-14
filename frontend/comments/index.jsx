/* eslint-env browser */
import { Component, render } from 'preact'
// import { test } from '/update.js'
import LinkedIn from './LinkedIn'
import User from './User'
import callbackFetch from '../fetch'

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
      return <div>Error: {this.state.error}</div>
    if (this.state.loading)
      return <div>Loading...</div>
    if (!this.state.auth.user)
      return <div>
        <LinkedIn host={this.props.host}/>
      </div>
    return <div>
      <button onClick={() => {
        const src = `/update.js?ts=${new Date().getTime()}`
        const script = document.createElement('script')
        script.type = 'module'
        script.src = src
        document.body.appendChild(script)
      }}>Update</button>
      <button onClick={() => {
        // test()
        debugger
      }}>Test</button>
      <User {...this.state.auth} onSignout={() => {
        this.setState({ auth: {} })
      }} host={this.props.host}/>
    </div>
  }
}

window['comments'] = ({
  host = 'https://technation.sucks', container = 'preact',
}) => {
  render(<App host={host}/>, document.getElementById(container))
}