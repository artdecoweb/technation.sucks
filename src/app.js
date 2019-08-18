import { Client } from 'elasticsearch'
import { c } from 'erte'
import Server from './server'
import { connect } from 'mongodb'
import { ping } from 'logarithm'

const elastic = process.env.ELASTIC
if (!elastic) throw new Error('Expecting ELASTIC env variable')

const mongo = process.env.MONGO_URL
if (!mongo) throw new Error('Expecting MONGO_URL env variable')

const client = new Client({
  elastic,
})

;(async () => {
  try {
    const [Mongo] = await Promise.all([
      connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true }),
      ping(elastic),
    ])
    console.log('Connected to %s', c(elastic, 'red'))
    console.log('Connected to %s', c(mongo.replace(/.+@(.+)/, 'mongodb://$1'), 'yellow'))
    const { url } = await Server({
      client, port: process.env.PORT,
      client_id: process.env.LINKEDIN_ID,
      client_secret: process.env.LINKEDIN_SECRET,
      github_id: process.env.GITHUB_ID,
      github_secret: process.env.GITHUB_SECRET,
      elastic, Mongo,
    })
    console.log('Started on %s/comments', c(url, 'green'))
  } catch ({ stack }) {
    console.log(stack)
  }
})()