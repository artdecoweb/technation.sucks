import spawn from 'spawncommand'
import compiler from 'google-closure-compiler-java'
import read from '@wrote/read'
import write from '@wrote/write'
import TempContext from 'temp-context'
import { generateTemp } from 'depack'
import { basename } from 'path'

const BUILD = 'depack-temp'

class BuildTemp extends TempContext {
  constructor() {
    super()
    this._TEMP = BUILD
  }
}

(async () => {
  const path = 'closure/comments.js'
  const t = new BuildTemp()
  await t._init()
  const args = [
    '-jar', compiler,
    '--compilation_level', 'ADVANCED',
    '--language_in', 'ECMASCRIPT_2018',
    '--externs', 'build/xhr.js',
    '--js_output_file', path,
    '--create_source_map', '%outname%.map',
    '--source_map_include_content',
  ]
  try {
    const deps = await generateTemp('frontend/comments/index.jsx')
    const Args = [...args, ...deps.reduce((acc, d) => {
      return [...acc, '--js', d]
    }, [])]
    const { promise: promise2 } = spawn('java', Args)
    const { stdout: o, stderr: e, code: c } = await promise2
    if (c) throw new Error(e)
    await update(path)
    if (o) console.log(o)
    if (e) console.log(e)
  } catch (err) {
    console.log(err)
  } finally {
    await t._destroy()
  }
})()

const update = async (path) => {
  const name = basename(path)
  const r = await read(path)
  const c = `${r}\n//# sourceMappingURL=${name}.map`
  await write(path, c)
}