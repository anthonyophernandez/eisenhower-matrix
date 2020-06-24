import { Server, Response, Model, JSONAPISerializer, belongsTo } from 'miragejs'
import usersJSON from './users.json'
import matricesJSON from './matrices.json'

export default function () {
  const server = new Server({
    serializers: {
      application: JSONAPISerializer,
      user: JSONAPISerializer.extend({
        include: ['matrix']
      }),
      matrix: JSONAPISerializer.extend({
        include: ['user']
      })
    },
    models: {
      user: Model.extend({
        matrix: belongsTo()
      }),
      matrix: Model.extend({
        user: belongsTo()
      })
    },
    fixtures: {
      users: usersJSON,
      matrices: matricesJSON
    }
  })

  server.namespace = 'api'

  server.post('/sessions', function (schema, request) {
    const json = JSON.parse(request.requestBody)
    const response = schema.users.findBy({ username: json.username })
    if (response && json.password === 'master') {
      return this.serialize(response)
    } else {
      return new Response(401)
    }
  })
}
