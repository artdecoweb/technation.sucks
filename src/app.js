import { Client } from 'elasticsearch'
import { c } from 'erte'
import Server from './server'
import dotenv from '@demimonde/dotenv'
dotenv()

const host = `${process.env.ELASTIC}:9200`

const client = new Client({
  host,
})

;(async () => {
  try {
    await client.ping({
      requestTimeout: 10000,
    })
    console.log('Connected to %s', c(host, 'red'))
    const { url } = await Server({
      client, port: process.env.PORT,
      client_id: process.env.LINKEDIN_ID,
      client_secret: process.env.LINKEDIN_SECRET,
    })
    console.log('Started on %s/comments', c(url, 'green'))
  } catch ({ stack }) {
    console.log(stack)
  }
})()