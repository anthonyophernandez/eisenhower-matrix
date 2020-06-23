import { Server } from 'miragejs'
import usersJSON from './users.json'

export default function () {
  const server = new Server()

  server.namespace('api')

  server.get('/users', ({ db }, request) => db.users)

  server.db.loadData({ users: usersJSON })
}
