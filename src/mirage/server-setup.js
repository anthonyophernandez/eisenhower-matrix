import { Server, Response, Model, JSONAPISerializer, belongsTo, hasMany } from 'miragejs'
import usersJSON from './users.json'
import matricesJSON from './matrices.json'
import listsJSON from './lists.json'
import tasksJSON from './tasks.json'

export default function () {
  const server = new Server({
    serializers: {
      application: JSONAPISerializer,
      user: JSONAPISerializer.extend({
        include: ['matrix']
      }),
      matrix: JSONAPISerializer.extend({
        include: ['lists']
      }),
      list: JSONAPISerializer.extend({
        include: ['tasks']
      }),
      task: JSONAPISerializer.extend({
        normalize (json) {
          return {
            data: {
              type: 'task',
              attributes: json
            }
          }
        }
      })
    },
    models: {
      user: Model.extend({
        matrix: belongsTo()
      }),
      matrix: Model.extend({
        user: belongsTo(),
        lists: hasMany()
      }),
      list: Model.extend({
        matrix: belongsTo(),
        tasks: hasMany()
      }),
      task: Model.extend({
        list: belongsTo()
      })
    },
    fixtures: {
      users: usersJSON,
      matrices: matricesJSON,
      lists: listsJSON,
      tasks: tasksJSON
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

  server.get('/matrices/:id')
  server.get('/lists/:id')
  server.put('/tasks/:id')
  server.delete('/tasks/:id')
}
