/* typal types/index.xml externs */
/**
 * @record
 */
var Auth
/**
 * User Info.
 * @type {{ profilePicture: string, firstName: string, lastName: string, id: string }}
 */
Auth.prototype.linkedin_user
/**
 * GitHub User.
 * @type {_idio.GithubUser}
 */
Auth.prototype.github_user
/**
 * The CSRF token.
 * @type {string}
 */
Auth.prototype.csrf
