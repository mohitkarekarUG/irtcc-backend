const Meeting = require('./../db/Meeting')
const zoom = require('./zoom')

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
    async createMeeting(meetingTopic) {
        try {
            let activeUserId =  await zoom.getUserId();

            let meetingDetails = await zoom.createNewMeeting(activeUserId, meetingTopic);
            return await Meeting.create({
                zoomId: meetingDetails.id,
                zoomUrl: meetingDetails.join_url,
                startUrl: meetingDetails.start_url,
                hostId: meetingDetails.host_id
            }).then(m => {
                return { data: { meeting: m } }
            }).catch(e => {
                console.error('Could not create meeting.', meetingId, e)
                return { error: 'Could not create meeting.' }
            })
        } catch(e) {
            console.log(e)
        }
    },
    addMember({ meetingId, memberId, socketId, isAdmin }) {
        return Meeting.findById(meetingId).then(m => {
            if(m && !m.members.find(m => m.memberId === memberId)) {
                m.members.push({
                    memberId,
                    socketId,
                    isAdmin
                })
                return m.save().then(() => ({ data: { meeting: m } }))
            } else {
                m.members = m.members.map(mem => {
                    if(mem && mem.memberId === memberId) {
                        mem.socketId = socketId
                    }
                    return mem
                })
                return m.save().then(() => ({ data: { meeting: m } }))
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
    removeUser({ meetingId, memberId }) {
        return Meeting.findById(meetingId).then(meeting => {
            let memberIdx = meeting.members.findIndex(m => m.memberId === memberId)
            if(memberIdx > -1) {
                meeting.members.splice(memberIdx, 1)
                return meeting.save()
            }
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