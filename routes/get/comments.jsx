const Closure = ({ closure }) => {
  if (closure) return (<script src="/comments.js"></script>)
  return (<script type="module" src="frontend/comments"></script>)
}

/**
 * @type {import('../..').Middleware}
 */
export default (ctx) => {
  const { CLOSURE, HOST } = ctx
  const { csrf, user } = ctx.session

  const App = (<div>
    {user && <pre
      dangerouslySetInnerHTML={{ __html:
        JSON.stringify(ctx.session.user, null, 2) }} />}
    {user && <form action="/signout" method="post">
      <input name="csrf" type="hidden" value={csrf} />
      <button type="submit">Sign Out</button>
    </form>}
    {!user && <a href="/auth/linkedin">Sign In</a>}

    <div id="preact"/>

    <script src="node_modules/preact/dist/preact.umd.js"/>

    <Closure closure={CLOSURE}/>

    <script type={CLOSURE ? undefined : 'module'}>
      {`window.comments({ host: '${HOST}' })`}
    </script>
  </div>)

  ctx.body = ctx.render(App, { title: 'Comments' })
}

export const middleware = ['session']