const mongoose = require('mongoose')

const Meeting = mongoose.model('Meeting', new mongoose.Schema({
    zoomId: String,
    members: { type: Array, default: [] },
    updates: { type: Array, default: [] },
    createdAt: { type: Date, default: new Date() }
}))

module.exports = Meeting