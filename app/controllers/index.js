const Meeting = require('./../db/Meeting')

module.exports = {
    async getMeeting(meetingId) {
        return await Meeting.findById(meetingId).then(meeting => {
            if(meeting) return { data: meeting }
            else return { error: 'Could not find meeting.' }
        }).catch(e => {
            console.log('Could not find meeting.', meetingId, e)
            return { error: 'Could not find meeting.' }
        })
    },
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
    addMember({ meetingId, memberId, socketId, isAdmin }) {
        return Meeting.findById(meetingId).then(m => {
            if(!m.members.find(m => m.memberId === memberId)) {
                m.members.push({
                    memberId,
                    socketId,
                    isAdmin
                })
                return m.save().then(() => ({ data: { meeting: m } }))
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