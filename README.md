# Technation.Sucks

This app is the back-end for the [Tech Nation Visa Sucks](https://www.technation.sucks) website. It powers the comments system by recording them in ElasticSearch and has the front-end code for Preact components for the JavaScript comments widget. The frond-end is built using Google Closure compiler run on JSX transpiled with `@a-la/jsx` package.

![logo](images/reflex.png)

It also records the visitors to the website in ElasticSearch to be able to gather statistics about how many people visited the website.

## The Server

The server is implemented using the `@idio/core` package with the route initialisation by `@idio/router` for fast reloading of pages when on the development environment. The LinkedIn authorisation for comments is enabled with `@idio/linkedin` which sets up the appropriate routes to perform 3-way handshare with Linkedin by obtaining the temporary token and then exchanging it for the access token, with which such information as the user name and positions are obtained. This information is stored in the session and not recorded anywhere else apart from against the comment the uses decides to leave.

## Counter.svg

The counter is implemented using the `@svag/terminal` window with the data pulled from ElasticSearch. To ensure that only unique visits are calculated, the handle image which is served and used to determine a visit is cached using an _Etag_, so that people even with dynamic IP addresses will be served with status code 304, whereas a visit is counted only for response status codes 200.

![counter](images/counter.svg?sanitize=true)

## Front End

The front-end is implemented as JSX components which are rendered with the Preact library. This allowed the delivered code to be as minimal as possible. The process of building consists of compiling the JSX code into plain JavaScript using the minimal reg-exp based `@a-la/jsx` transpiler. The development version is served using ES modules which are supported by the browser natively, meaning there does not need to be a compilation step involved which is very convenient since the actual compilation by Google Closure takes about a minute. Still, the JSX is not understood by the browser, but the `jsx` middleware installed on the server allows to run the transpilation of JSX source code files when `.jsx` pages are requested. There's no support for JSX source maps, however the code formatting is kept intact so that each line is where the its source is.

```jsx
/* eslint-env browser */
import LinkedIn from './LinkedIn.jsx'
import User from './User.jsx'
import callbackFetch from '../fetch.js'

const { Component, h, render } = window.preact

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
```

---

&copy; [Art Deco](https://artd.eco) 2019
