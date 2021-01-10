const router = require('express').Router()
const User = require('../models/User')
const Message = require('../models/Message')

router.get('/:id', async (req, res) => {
    const users = (await User.find({})).filter(a => a.email != req.user.email)
    const user = await User.findById(req.params.id)
    const messages = await Message.findOne({senders: [String(req.user._id), req.params.id].sort()})

    res.render('chat/single', {user, messages: messages ? messages.messages : [], users })
})

router.get('/', async (req, res) => {
    const users = (await User.find({})).filter(a => a.email != req.user.email)
    res.render('chat/chat', {users })
})

module.exports = router