import Form, {
  FormGroup, Input, TextArea, SubmitButton, SubmitForm,
} from '@depack/form'
import { getUserData } from '../Auth/lib'
import CaptchaFormGroup from '../captcha'

export default class CommentForm extends SubmitForm {
  constructor() {
    super()
    this.fetchOptions = { credentials: 'include' }
  }
  /**
   * @param {!Object} [props]
   * @param {Auth} [props.auth]
   */
  render({ onChange, host, auth, ...props }) {
    const { formLoading, error, success } = this.state

    const { picture, name } = getUserData(auth)

    return (<Form {...props} onSubmit={this.submit.bind(this)} onChange={values => {
      this.reset()
      if(onChange) onChange(values)
    }}>
      {picture && <Input type="hidden" name="photo" value={picture} />}
      <Input type="hidden" name="csrf" value={auth.csrf} />
      <FormGroup form-row col-2 label="Name*" help="This will appear on the website">
        <Input col-10 name="name" value={name} />
      </FormGroup>
      <FormGroup form-row col-2 label="GitHub" help={auth.github_user ? 'GitHub username, sign out to remove' : 'Please sign in with GitHub'}>
        <Input col-10 name="github" disabled value={auth.github_user ? auth.github_user.html_url : null}/>
      </FormGroup>
      <FormGroup form-row col-2 label="Comment*" help="Please enter your opinion">
        <div className="col-10">
          <TextArea required name="comment">
            I think you're right/wrong because...
          </TextArea>
        </div>
      </FormGroup>
      <CaptchaFormGroup host={host} auth={auth} />
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
