import { makeElement } from '@svag/lib'
import Window from '@svag/window'

/**
 * @type {import('../..').Middleware}
 */
const counter = async (ctx) => {
  ctx.type = 'image/svg+xml'

  const client = ctx.client
  const { appName } = ctx

  const { aggregations: {
    distinct_ips: { value: count },
  } } = await client.search({
    type: 'hit',
    index: `${appName}-*`,
    body: {
      query: {
        bool: {
          must: [
            {
              bool: {
                should: [
                  // first version
                  { match: { path:  'reflex.png' } },
                  // second version
                  { match: { path:  'reflex.jpg' } },
                ],
              },
            },
            {
              bool: {
                should: [
                  { match: { status:  200 } },
                  // 7 Jan Bug
                  { match: { status:  404 } },
                ],
              },
            },
            { match: { 'headers.referer':  'www.technation.sucks' } },
          ],
          must_not: [
            { match: { 'headers.from':  'googlebot' } },
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
  const res = makeWindow(count)
  ctx.body = res
}

const makeWindow = (count) => {
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
}

export default counter