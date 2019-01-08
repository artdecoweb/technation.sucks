export default (ctx) => {
  const { error } = ctx.query
  ctx.body = `
<!doctype html>
<html>
<head>
  <title>Sign In Callback</title>
</head>
<body>
  <p>
    ${error ? 'You have not authorised the app. ' : ''}Please close this window if not closed automatically in the next 60 seconds.
  </p>
  <script>
    window.opener.postMessage('${error ? 'linkedin-error' : 'linkedin-signedin'}')
    window.close()
  </script>
</body>
</html>`
}

// export const middleware = (r) => ['session', r]