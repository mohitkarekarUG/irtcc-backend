const controller = require('./../controllers')
module.exports = function(io, socket) {
    //events
    console.log('connection')
    
    socket.on('test', () => {
        console.log('test')
    })

    socket.on('addMember', ({ meetingId, memberId, isAdmin }, cb) => {
        controller.addMember({ meetingId, memberId, socketId: socket.id, isAdmin }).then(({ data }) => {
            console.log('Member added', memberId)
            socket.join(meetingId)
            io.to(meetingId).emit('newMemberAdded', { meetingId, members: data.meeting.members })
        })
    })

    socket.on('createInteraction', ({ meetingId, type, data }) => {
        console.log(type, data, meetingId)
        io.to(meetingId).emit('newInteraction', { type, data })
    })

    socket.on('updateData', ({ meetingId, type, data }) => {
        socket.to(meetingId).emit('dataUpdated', { type, data })
    })

    socket.on('toggleControl', ({ meetingId, memberId }) => {
        // io.to(`${socketId}`).emit('toggleControl', { memberId })
        io.to(meetingId).emit('controlChanged', { memberId })
    })

    socket.on('disconnect', ({ meetingId, memberId }) => {
        controller.removeUser({ meetingId, memberId }).then(() => {
            socket.leave(meetingId)
        })
    })
}