import axios from "axios"
import { API_URL } from "."

export function login (data) {
    console.log(data)
    axios.post(API_URL+'login', data)
        .then(res=> console.log(res))
        .catch(err => console.log(err))
}

export function register (data) {
    console.log(data)
    axios.post(API_URL+'register', data)
        .then(res=> console.log(res))
        .catch(err => console.log(err))
}