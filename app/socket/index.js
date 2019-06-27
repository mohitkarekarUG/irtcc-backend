const controller = require('./../controllers')
module.exports = function(io, socket) {
    //events
    console.log('connection')

    socket.on('test', () => {
        console.log('test')
    })

    socket.on('addMember', ({ meetingId, memberId, isAdmin }) => {
        socket.join(meetingId)
        controller.addMember({ meetingId, memberId, socketId: socket.id, isAdmin }).then(({ data }) => {
            if(data) io.to(meetingId).emit('newMemberAdded', { meetingId, members: data.meeting.members })
        })
    })

    socket.on('createInteration', ({ meetingId, type, data }) => {
        socket.to(meetingId).emit('newInteraction', { type, data })
    })

    socket.on('updateData', ({ meetingId, type, data }) => {
        socket.to(meetingId).emit('dataUpdated', { type, data })
    })

    socket.on('toggleControl', ({ meetingId, socketId }) => {
        io.to(`${socketId}`).emit('toggleControl', { control })
    })
}