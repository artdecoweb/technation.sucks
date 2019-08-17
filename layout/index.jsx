export default function DefaultLayout({ title, children }) {
  return (<html>
    <head>
      <title>{title}</title>
    </head>
    <body>
      {children}
    </body>
  </html>)
}