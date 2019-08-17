import { Client } from 'elasticsearch'
import { c } from 'erte'
import Server from './server'
import { ping } from 'logarithm'

const elastic = process.env.ELASTIC
if (!elastic) throw new Error('Expecting ELASTIC env variable')

const client = new Client({
  elastic,
})

;(async () => {
  try {
    await ping(elastic)
    console.log('Connected to %s', c(elastic, 'red'))
    const { url } = await Server({
      client, port: process.env.PORT,
      client_id: process.env.LINKEDIN_ID,
      client_secret: process.env.LINKEDIN_SECRET,
      elastic,
    })
    console.log('Started on %s/comments', c(url, 'green'))
  } catch ({ stack }) {
    console.log(stack)
  }
})()