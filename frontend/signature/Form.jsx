import Form, {
  FormGroup, Input, TextArea, SubmitButton, SubmitForm, Select,
} from '@depack/form'
import { getUserData } from '../Auth/lib'
import callbackFetch from '../fetch'

export default class CommentForm extends SubmitForm {
  constructor() {
    super()
    this.fetchOptions = { credentials: 'include' }
    this.state.npm = null
    this.state.npmFetchError = null
    this.npmInput = null
  }
  /**
   * @param {!Object} [props]
   * @param {Auth} [props.auth]
   */
  render({ onChange, auth, ...props }) {
    const { formLoading, error, success, npmCount, npmFetchError, npmLoading } = this.state

    const { picture, name } = getUserData(auth)

    let npmHelp = 'Your NPM profile name.'
    if (npmLoading) npmHelp = `Fetching your packages....`
    else if (npmCount) npmHelp = `You've made ${npmCount} packages.`
    else if (npmFetchError) npmHelp = `Error loading NPM: ${npmFetchError}`

    return (<Form {...props} onSubmit={this.submit.bind(this)} onChange={values => {
      this.reset()
      if (onChange) onChange(values)
      this.setState({
        npmFetchError: null,
      })
      const { 'npm': npm } = values
      if (npm && this.state.npm != npm) {
        this.setState({
          npmLoading: true,
        })
        callbackFetch(`${this.props.host}/npm?user=${npm}`, (e, res) => {
          this.setState({
            npmLoading: false,
          })
          if (e) {
            return this.setState({
              npmFetchError: e,
              npmCount: null,
            })
          }
          const { 'error': err, 'count': count } = res.json()
          if (err) {
            return this.setState({
              npmFetchError: err,
              npmCount: count,
            })
          }
          this.setState({
            npmFetchError: null,
            npmCount: count,
          })
        })
      }
    }}>
      {picture && <Input type="hidden" name="photo" value={picture} />}
      <Input type="hidden" name="csrf" value={auth.csrf} />
      <FormGroup label="Name*" help="This will appear on the website"
        form-row labelClassName="col-sm-2 col-md-1">
        <div className="col-sm-10 col-md-11">
          <Input name="name" value={name} />
        </div>
      </FormGroup>
      <FormGroup label="Country" help="Your residence country."
        form-row labelClassName="col-sm-2 col-md-1">
        <div className="col-sm-10 col-md-11">
          <Input name="country" />
        </div>
      </FormGroup>
      <FormGroup details detailsClass="mb-3" label="Organisation" help="Where you work.">
        <Input name="org" placeholder="name" className="mb-1" />
        <Input name="url" type="url" placeholder="url" className="mb-1" />
        <Select name="org-size" className="mb-1"
          defaultText="select size" options={[
            { value: 'small', title: 'small (＜5 employees)' },
            { value: 'medium', title: 'medium (＜35 employees)' },
            { value: 'large', title: 'large (＜100 employees)' },
            { value: 'enterprise', title: 'enterprise' },
          ]} />
      </FormGroup>
      <FormGroup label="GitHub" help={auth.github_user ? 'GitHub username, sign out to remove.' : 'Please sign in with GitHub to fill in and verify automatically.'}>
        <Input name="github" disabled value={auth.github_user ? auth.github_user.html_url : undefined}/>
      </FormGroup>
      <FormGroup label="NPM" help={auth.github_user ? npmHelp : 'To add and validate your NPM, sign in with GitHub and make sure your NPM profile page links to it (<a href="https://www.npmjs.com/settings/USERNAME/profile" target="_blank">NPM Settings</a>).'} invalid={npmFetchError} valid={npmCount}>
        <Input name="npm" valid={npmCount} disabled={!auth.github_user} invalid={npmFetchError} ref={(i) => {
          this.npmInput = i
        }} onInput={(e) => {
          const value = e.currentTarget.value
          if (!npmFetchError) return
          this.setState({
            npmFetchError: null,
          }, () => {
            e.currentTarget.value = value
          })
        }}/>
      </FormGroup>
      <FormGroup form-row labelClassName="col-sm-2 col-md-1" label="Title" help="E.g., Senior Software Engineer">
        <div className="col-sm-10 col-md-11">
          <Input name="title" />
        </div>
      </FormGroup>
      <FormGroup label="Experience" help="How many years of experience you have" form-row labelClassName="col-md-2 ">
        <div className="col-md-10">
          <Input name="experience" placeholder="3" />
        </div>
      </FormGroup>
      <FormGroup label="Comment" help="Any additional information">
        <TextArea name="comment" />
      </FormGroup>
      <SubmitButton loading={formLoading} type="warning"
        confirmText="Submit Data" />
      {error && `Error: ${error}`}
      {success && `Comment has been submitted!`}
    </Form>)
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Auth} Auth
 */
