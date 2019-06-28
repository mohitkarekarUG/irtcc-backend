const express = require('express')
const router = express.Router()

const controller = require('./../controllers')

//createMeeting
//addMember
//getMembers
//saveData

router.post('/meeting/create', async (req, res) => res.send(await controller.createMeeting(req.body.meetingTopic)))
// router.post('/meeting/:meetingId/add-member', async (req, res) => res.send(await controller.addMember(req.params.meetingId, req.body.memberId)))
router.get('/meeting/:meetingId/members', async (req, res) => res.send(await controller.getMembers(req.params.meetingId)))
router.post('/meeting/:meetingId/save-update', (req, res) => res.send(controller.saveData(req.params.meetingId, req.body.data)))

module.exports = router