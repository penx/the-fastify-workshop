import errors from 'http-errors'
import S from 'fluent-json-schema'

const schema = {
  body: S.object()
    .prop('username', S.string().required())
    .prop('password', S.string().required()),
  response: {
    200: S.object().prop('token', S.string().required()),
  },
}

export default async function login(fastify) {
  fastify.post('/login', { schema }, async req => {
    const { username, password } = req.body

    // sample auth check
    if (username !== password) {
      throw errors.Unauthorized()
    }

    return { token: fastify.jwt.sign({ username }) }
  })
}
