const controller = require('./../controllers')
module.exports = function(io, socket) {
    //events
    console.log('connection')

    socket.on('test', () => {
        console.log('test')
    })

    socket.on('addMember', ({ meetingId, memberId, isAdmin }, cb) => {
        controller.addMember({ meetingId, memberId, socketId: socket.id, isAdmin }).then(({ data }) => {
            if(data) {
                socket.join(meetingId)
                io.to(meetingId).emit('newMemberAdded', { meetingId, members: data.meeting.members })
            }
        })
    })

    socket.on('createInteration', ({ meetingId, type, data }) => {
        io.to(meetingId).emit('newInteraction', { type, data })
    })

    socket.on('updateData', ({ meetingId, type, data }) => {
        socket.to(meetingId).emit('dataUpdated', { type, data })
    })

    socket.on('toggleControl', ({ meetingId, memberId, socketId }) => {
        io.to(`${socketId}`).emit('toggleControl', { control })
        io.to(meetingId).emit('toggleChanged', { memberId })
    })
}