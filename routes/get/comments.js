const template = (content) => {
  return `<!doctype html>
<html>
  <head>
    <title>Comments</title>
  </head>
  <body>
  ${content}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.4.2/preact.min.js" integrity="sha256-PlZR9F40jop06jDR6IgvCXP2vZl4pnOdhqWDW8dqO8w=" crossorigin="anonymous"></script>
  <!--<script type="module" src="/comments.js"></script>-->
  <script src="/bundle.js"></script>
  </body>
</html>`
}

export default (ctx) => {
  const user = JSON.stringify(ctx.session.user, null, 2)
  const { csrf } = ctx.session
  const auth = user ? `<form action="/signout" method="post">
  <input name="csrf" type="hidden" value="${csrf}">
  <button type="submit">Sign Out</button>
  </form>` : '<a href="/auth/linkedin">Sign In</a>'
  const User = ctx.session.user ? `<pre>${user}</pre>` : ''
  ctx.body = template(`
    ${User}
    ${auth}
    <div id="preact"></div>`
  )
}

export const middleware = (route) =>
  ['session', route]