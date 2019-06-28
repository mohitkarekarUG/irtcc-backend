const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.zoom.us/v2',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkJOWGFkLVBwUzFLZ1hmUV8yQW9VV3ciLCJleHAiOjE1NjIzMTE2NjIsImlhdCI6MTU2MTcwNjg2M30.WHSCRSSRoLcu3lAzg5jW4_Jo2-VJqdg9PTW2Oy7LBVc'
    }
  });

module.exports = instance