const Meeting = require('./../db/Meeting')

module.exports = {
    async createMeeting(meetingId) {
        return await Meeting.create({
            zoomId: meetingId
        }).then(m => {
            return { data: { meeting: m } }
        }).catch(e => {
            console.error('Could not create meeting.', meetingId, e)
            return { error: 'Could not create meeting.' }
        })
    },
    async addMember(meetingId, memberId) {
        return await Meeting.findById(meetingId).then(async m => {
            if(m.members.indexOf(memberId) === -1) {
                m.members.push(memberId)
                await m.save()
                return { data: { meeting: m } }
            } else {
                return { error: 'Member already present.' }
            }
        }).catch(e => {
            console.error('Could not add member.', meetingId, memberId, e)
            return { error: 'Could not add member.' }
        })
    },
    async getMembers(meetingId) {
        return await Meeting.findById(meetingId).then(m => {
            return { data: { members: m.members } }
        }).catch(e => {
            console.error('Could not get members.', meetingId, e)
            return { error: 'Could not get memebers.' }
        })
    },
    saveData(meetingId, data) {
        Meeting.findById(meetingId).then(m => {
            m.updates.push({
                timestamp: Date.now(),
                data
            })
            m.save()
        })
    }
}