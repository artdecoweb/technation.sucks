import render from '@depack/render'

export {}
/**
 * @typedef {{ admin: boolean, github_token: string, linkedin_token: string } & Auth} Session
 * @typedef {import('@typedefs/goa').Context & { render: typeof render, client: elasticsearch.Client, session: Session, mongo: mongodb.Db }} Context
 * @typedef {(ctx: Context, next: Middleware) => Promise} Middleware
 */


/* typal types/index.xml namespace */
/**
 * @typedef {import('elasticsearch').Client} elasticsearch.Client
 * @typedef {import('mongodb').Db} mongodb.Db
 * @typedef {import('@idio/github').GithubUser} _idio.GithubUser
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {Object} Auth `＠record`
 * @prop {{ profilePicture: string, firstName: string, lastName: string, id: string }} [linkedin_user] User Info.
 * @prop {_idio.GithubUser} [github_user] GitHub User.
 * @prop {string} [csrf] The CSRF token.
 */
