import spawn from 'spawncommand'
import compiler from 'google-closure-compiler-java'

(async () => {
  const args = [
    '-jar', compiler,
    '--js', 'static/comments.js',
    '--js', 'static/comments/*.js',
    '--compilation_level', 'ADVANCED',
    '--language_in', 'ECMASCRIPT_2018',
    '--externs', 'build/preact-externs.js',
    '--externs', 'build/xhr.js',
    '--js_output_file', 'closure/bundle.js',
    // '--formatting', 'PRETTY_PRINT',
    '--create_source_map', '%outname%.map',
    '--source_map_include_content',
    // ...files.reduce((a, f) => [...a, '--js', f], []),
  ]
  const { promise: promise2 } = spawn('java', args)
  const { stdout: o, stderr: e, code: c } = await promise2
  if (c) throw new Error(e)
  console.log(o)
  console.log(e)
})()