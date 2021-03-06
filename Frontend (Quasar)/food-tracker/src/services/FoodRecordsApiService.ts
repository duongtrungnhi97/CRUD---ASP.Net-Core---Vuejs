// import Vue from 'vue'
import axios from "axios";

const client = axios.create({
  baseURL: "https://localhost:5001/api/FoodRecords"
});

export default class api {
  static async execute(method: any, resource: any, data?: any) {
    // const accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data;
    });
  }
  static getAll() {
    return this.execute("get", "/");
  }
  static create(data: any) {
    return this.execute("post", "/", data);
  }
  static update(id: any, data: any) {
    return this.execute("put", `/${id}`, data);
  }
  static delete(id: any) {
    return this.execute("delete", `/${id}`);
  }
}
