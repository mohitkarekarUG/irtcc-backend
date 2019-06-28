const axios = require('axios');
const constants = require('./../config/constants')
const instance = require('./../helpers/zoomInstance')

module.exports = {
    async getUserId(){
        try{
            let currentUserId = await instance.get('/users')
            console.log('currentUserId', currentUserId)
            return currentUserId.data.users[0].id
        }
        catch(err){
            console.log('err')
        }
    },
    async createNewMeeting(userId, meetingTopic){
        try {
            console.log('userId', userId)
            let meetingDetails = await instance.post(`/users/${userId}/meetings`,{
                topic: meetingTopic,
                type: 1
              })
            return meetingDetails.data
        }
        catch(err){
            console.log('err')
        }
    }
}