import spawn from 'spawncommand'
import compiler from 'google-closure-compiler-java'
import read from '@wrote/read'
import write from '@wrote/write'

(async () => {
  const path = 'closure/bundle.js'
  const args = [
    '-jar', compiler,
    '--js', 'static/comments/*.js',
    '--compilation_level', 'ADVANCED',
    '--language_in', 'ECMASCRIPT_2018',
    '--externs', 'build/preact-externs.js',
    '--externs', 'build/xhr.js',
    '--js_output_file', path,
    // '--formatting', 'PRETTY_PRINT',
    '--create_source_map', '%outname%.map',
    '--source_map_include_content',
    // ...files.reduce((a, f) => [...a, '--js', f], []),
  ]
  const { promise: promise2 } = spawn('java', args)
  const { stdout: o, stderr: e, code: c } = await promise2
  if (c) throw new Error(e)
  await update(path, 'static/comments.js')
  if (o) console.log(o)
  if (e) console.log(e)
})()

const update = async (path, newPath) => {
  const r = await read(path)
  const c = r.replace('http://localhost:5000', 'https://technation.sucks')
  await write(newPath, c)
}