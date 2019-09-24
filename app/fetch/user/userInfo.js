import { get } from '../get'
import { post } from '../post'

export function getUser(username, password) {
    const result = get('/api/userinfo/' + username + '/' + password);
    return result
  }

export function registerUser(username, password) {
  const result = post('/api/registerUser', {
    username: username,
    password: password
  })
  return result
}