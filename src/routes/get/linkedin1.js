export default (ctx) => {
  if (!/LinkedInBot/.test(ctx.headers['user-agent'])) {
    ctx.redirect('https://www.technation.sucks/#check')
    return
  }
  ctx.body = `<!doctype html>
<html lang="en">
<head>
  <meta property="og:title" content="Tech Nation Sucks: How the Senior Manager thought they could lie to the Home Office by making the decision on my application themselves." />
  <meta name="author" content="Art Deco" />
  <meta property="og:image" content="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/linkedin/key-linkedin.png" />
</head>
</html>`
}