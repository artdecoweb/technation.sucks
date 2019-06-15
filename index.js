export {}
/**
 * @typedef {import('@goa/koa').Context & { client: Client, session: { admin: boolean } }} Context
 * @typedef {(ctx: Context, next: !Function)} Middleware
 */

/**
 * @typedef {import('./src/database').default} Database
 */
/** @typedef {import('elasticsearch').Client} Client */