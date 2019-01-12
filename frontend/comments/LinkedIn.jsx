/* eslint-env browser */
import { h } from 'preact'

const popup = (url, width, height) => {
  const { top: {
    outerHeight, screenY, outerWidth, screenX,
  } } = window
  const y = outerHeight / 2 + screenY - (height / 2)
  const x = outerWidth / 2 + screenX - (width / 2)
  window.open(url, 'Sign in', `height=${height},width=${width},top=${y-50},left=${x}`)
}

const buttonStyle =`
  background: #0077B5;
  display: table;
  border-radius: 3px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  text-decoration: none;
  color: white;
  cursor: pointer;`
const inStyle = `
  font-family: 'Myriad Pro', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
  padding-left: 6px;
  padding-right: 5px;
  border-right: 1px solid #0369A0;
  border-radius: 3px;
  font-weight: 600;
  background: #0077B5;
  display: table-cell;
  vertical-align: middle;
  `
const textStyle = `
  padding-left:0.5em;
  padding-right:0.5em;
  font-size: smaller;
  display: table-cell;
  vertical-align: middle;`

const LinkedIn = ({ size = 'medium', host, signinLink = '/linkedin' }) => {
  let r
  if (size == 'medium') r = 1.5
  else if (size == 'large') r = 2
  return <a onClick={(e) => {
    e.preventDefault()
    const height = 610
    const width = 500
    popup(`${host}${signinLink}`, width, height)
    return false
  }} onMouseOver={(e) => {
    e.currentTarget.style.background = '#0369A0'
  }} onMouseOut={(e) => {
    e.currentTarget.style.background = '#0077B5'
  }} style={buttonStyle}>
    <div style={`font-size:${r}rem;${inStyle}`}>in</div>
    <div style={textStyle}>Sign In With LinkedIn</div>
  </a>
}

export default LinkedIn