// import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'https://localhost:5001/api/FoodRecords',
  json: true
})

export default class api {
  static async execute(method, resource, data) {
    // const accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  }
  static getAll() {
    return this.execute('get', '/')
  }
  static create(data) {
    return this.execute('post', '/', data)
  }
  static update(id, data) {
    return this.execute('put', `/${id}`, data)
  }
  static delete(id) {
    return this.execute('delete', `/${id}`)
  }
}