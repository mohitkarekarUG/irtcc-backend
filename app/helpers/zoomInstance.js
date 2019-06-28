const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.zoom.us/v2',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkJOWGFkLVBwUzFLZ1hmUV8yQW9VV3ciLCJleHAiOjE1NjIyNzg5MjAsImlhdCI6MTU2MTY3NDEyMH0.79wHAAXzrxSgp1UQLPckBSnJRbgcx07irMenNuB7Dkw'
    }
  });

module.exports = instance