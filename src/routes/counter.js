import { makeElement } from '@svag/lib'
import Window from '@svag/window'

/**
 * @type {import('koa').Middleware}
 */
const counter = async (ctx) => {
  /** @type {import('elasticsearch').Client} */
  const client = ctx.client
  const { aggregations: {
    distinct_ips: { value: count },
  } } = await client.search({
    type: 'hit',
    index: 'technation.sucks-*',
    body: {
      query: {
        bool: {
          should: [
            { match: { path:  'reflex.jpg' } },
            { match: { 'headers.referer':  'www.technation.sucks' } },
          ],
        },
      },
      size: 0,
      aggs: {
        distinct_ips: {
          cardinality: {
            field: 'headers.x-forwarded-for.keyword',
          },
        },
      },
    },
  })
  const line = makeElement('text', {
    attributes: {
      'font-family': 'Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace',
      'font-size': '12px',
      x: 0,
      y: 10,
    },
    content: `$ ${count} people now know`,
  })
  const line2 = makeElement('text', {
    attributes: {
      'font-family': 'Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace',
      'font-size': '12px',
      x: 0,
      y: 25,
    },
    content: 'that Tech Nation sucks',
  })
  const res = Window({
    title: 'Views',
    width: 165,
    height: 50,
    noStretch: true,
    content: [line, line2],
    noShadow: true,
  })
  ctx.type = 'image/svg+xml'
  ctx.body = res
}

export default counter