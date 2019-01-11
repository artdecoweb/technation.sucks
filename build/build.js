import spawn from 'spawncommand'
import compiler from 'google-closure-compiler-java'
import read from '@wrote/read'
import write from '@wrote/write'
import readDirStructure from '@wrote/read-dir-structure'
import clone from '@wrote/clone'
import transpileJSX from '@a-la/jsx'
import TempContext from 'temp-context'
import { join } from 'path'

const BUILD = 'build-temp'

class BuildTemp extends TempContext {
  constructor() {
    super()
    this._TEMP = BUILD
  }
}

(async () => {
  const path = 'closure/bundle.js'
  const t = new BuildTemp()
  await t._init()
  const args = [
    '-jar', compiler,
    '--js', `${BUILD}/**.js`,
    '--compilation_level', 'ADVANCED',
    '--language_in', 'ECMASCRIPT_2018',
    '--externs', 'build/preact-externs.js',
    '--externs', 'build/xhr.js',
    '--js_output_file', path,
    '--create_source_map', '%outname%.map',
    '--source_map_include_content',
  ]
  const { promise: promise2 } = spawn('java', args)
  try {
    await cloneSrc('')
    const { stdout: o, stderr: e, code: c } = await promise2
    if (c) throw new Error(e)
    await update(path, 'static/comments.js')
    if (o) console.log(o)
    if (e) console.log(e)
  } catch (err) {
    console.log(err)
  } finally {
    await t._destroy()
  }
})()

const cloneSrc = async (dir, to, content) => {
  if (!content) content = (await readDirStructure(dir)).content
  await Object.keys(content, async (acc, key) => {
    await acc
    const path = join(dir, key)
    const pathTo = join(to, key)
    const { type, content: c } = content[key]
    if (type == 'Directory') {
      await cloneSrc(path, pathTo, c)
      return
    }
    if (!key.endsWith('.jsx')) {
      await clone(path, to)
    } else {
      const f = await read(path)
      const res = transpileJSX(f)
      await write(path, res)
    }
  }, {})
}

const update = async (path, newPath) => {
  const r = await read(path)
  const c = r.replace('http://localhost:5000', 'https://technation.sucks')
  await write(newPath, c)
}