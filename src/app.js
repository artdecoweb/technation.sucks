import { Client } from 'elasticsearch'
import { c } from 'erte'
import Server from './server'
import dotenv from '@demimonde/dotenv'
dotenv()
import { ping } from 'logarithm'

const host = process.env.ELASTIC

const client = new Client({
  host,
})

;(async () => {
  try {
    await ping(host)
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