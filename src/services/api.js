import axios from 'axios'

export default () => {
  return axios.create({
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
