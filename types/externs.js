/* typal types/index.xml externs */
/**
 * @record
 */
var Auth
/**
 * User Info.
 * @type {({ profilePicture: string, firstName: string, lastName: string, id: string })|undefined}
 */
Auth.prototype.linkedin_user
/**
 * GitHub User.
 * @type {_idio.GithubUser|undefined}
 */
Auth.prototype.github_user
/**
 * The CSRF token.
 * @type {string|undefined}
 */
Auth.prototype.csrf
