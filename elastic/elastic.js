import { Client } from 'elasticsearch'
import { c as co } from 'erte'
import { inspect } from 'util'
import { makeKind } from './lib'

const c = new Client({
  host: `${process.env.ELASTIC}:9200`,
})

const settings = {
  number_of_shards: 1,
  number_of_replicas: 0,
}

const COMMENT = {
  created: 'date',
  author: 'string',
  position: 'string',
  comment: 'string',
  parent: 'string',
}

const putIndex = async (index) => {
  const comment = makeKind(COMMENT)
  const body = {
    settings,
    version: 1,
    mappings: { comment },
  }
  const res = await c.indices.create({
    index,
    body,
  })
  checkAcknowledgement(res)
  console.log('Created %s', co(index, 'red'), 'index')
}

const checkAcknowledgement = (res) => {
  const { acknowledged } = res
  if (!acknowledged) {
    console.log(co(JSON.stringify(res, null, 2), 'red'))
    throw new Error('No acknowledgement.')
  }
}

