import t from 'tap'

import buildServer from '../index.js'

const { test } = t

test('GET /users', async t => {
  t.test('returns users', async t => {
    const fastify = buildServer()

    const res = await fastify.inject('/users')

    t.strictEqual(res.statusCode, 200)

    t.equivalent(await res.json(), [
      { username: 'alice' },
      { username: 'bob' },
    ])
  })
})
