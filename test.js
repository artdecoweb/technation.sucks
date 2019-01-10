const jsx = require('@a-la/jsx')
const read = require('@wrote/read')

;(async () => {
  const r = await read('static/comments/User.jsx')
  const res = jsx(r)
  console.log(res)
})()