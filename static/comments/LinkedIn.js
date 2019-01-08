/* eslint-env browser */
const { h } = window.preact

const LinkedIn = ({ size = 'medium', host, signinLink = '/linkedin' }) => {
  let r
  if (size == 'medium') r = 1.5
  else if (size == 'large') r = 2
  return h('a', {
    onclick() {
      window.open(`${host}${signinLink}`, 'Sign in', 'height=610,width=500')
    },
    onmouseover(e) {
      e.currentTarget.style.background = '#0369A0'
    },
    onmouseout(e) {
      e.currentTarget.style.background = '#0077B5'
    },
    style: `
      background: #0077B5;
      display: table;
      border-radius: 3px;
      font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
      text-decoration: none;
      color: white;
      cursor: pointer;`,
  }, h('div', {
    style: `
      font-family: 'Myriad Pro', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
      font-size: ${r}rem;
      padding-left: 6px;
      padding-right: 5px;
      border-right: 1px solid #0369A0;
      border-radius: 3px;
      font-weight: 600;
      background: #0077B5;
      display: table-cell;
      vertical-align: middle;`,
  }, 'in'), h('div', {
    style: `
      padding-left:0.5em; padding-right:0.5em;font-size:smaller;
      display: table-cell;
      vertical-align: middle;`,
  }, 'Sign In With LinkedIn'))
}

export default LinkedIn