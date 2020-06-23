import { Server, Response } from 'miragejs'
import usersJSON from './users.json'

export default function () {
  const server = new Server()

  server.namespace = 'api'

  server.post('/sessions', function (schema, request) {
    const json = JSON.parse(request.requestBody)
    const response = schema.db.users.findBy({ username: json.username })
    if (response && json.password === 'master') {
      return response
    } else {
      return new Response(401)
    }
  })

  server.db.loadData({ users: usersJSON })
}
