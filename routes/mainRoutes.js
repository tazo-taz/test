const router = require('express').Router()
const User = require('../models/User')

router.get('/', (req, res) => res.render('home'))

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

router.post('/userdata', async (req, res) => {
    const user1 = await User.findById(req.user._id)
    const user2 = await User.findById(req.body.currentemail)
    const hasseen = user2.notseen.includes(user1._id)
    res.json({user1, hasseen})
})

module.exports = router