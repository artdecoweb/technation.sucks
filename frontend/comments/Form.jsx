import Form, {
  FormGroup, Input, TextArea, SubmitButton, SubmitForm,
} from '@depack/form'
import { getUserData } from '../Auth/lib'

export default class CommentForm extends SubmitForm {
  constructor() {
    super()
    this.fetchOptions = { credentials: 'include' }
  }
  /**
   * @param {!Object} [props]
   * @param {Auth} [props.auth]
   */
  render({ onChange, auth, ...props }) {
    const { formLoading, error, success } = this.state

    const { picture, name } = getUserData(auth)

    return (<Form {...props} onSubmit={this.submit.bind(this)} onChange={values => {
      this.reset()
      if(onChange) onChange(values)
    }}>
      {picture && <Input type="hidden" name="photo" value={picture} />}
      <Input type="hidden" name="csrf" value={auth.csrf} />
      <FormGroup label="Name*" help="This will appear on the website">
        <Input name="name" value={name} />
      </FormGroup>
      <FormGroup label="GitHub" help={auth.github_user ? 'GitHub username, sign out to remove' : 'Please sign in with GitHub'}>
        <Input name="github" disabled value={auth.github_user ? auth.github_user.html_url : null}/>
      </FormGroup>
      <FormGroup label="Comment*" help="Please enter your opinion">
        <TextArea required name="comment">
          I think you're right/wrong because...
        </TextArea>
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
