/* eslint-env browser */
import { render } from 'preact'
import CommentForm from './Form'
// import { test } from '/update.js'
import Auth from '../Auth'
import AppUser from '../Auth/AppUser'
import List from './List'

class App extends Auth {
  constructor() {
    super()
    this.list = null
  }
  render() {
    return (<div>
      <AppUser error={this.state.error} loading={this.state.loading} auth={this.state.auth} host={this.props.host} onSignOut={() => {
        this.setState({ auth: {} })
      }} />

      <CommentForm host={this.props.host} path={`${this.props.host}/comment`} auth={this.state.auth} submitFinish={async (res) => {
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