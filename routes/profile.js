const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const Item = require('../models/Item')
const Order = require('../models/Order')
const auth = require('../middleware/auth.middleware')


router.get('/:id', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id, {raw: true})
        const itemsList = await Item.findAll({where: {userid: req.params.id}, raw: true})

        if (!user) return res.json({message: 'No user with this id'})

        user = {'id': user.id, 'email': user.email, 'username': user.username}

        const reversedItemsList = itemsList.reverse()

        res.json({user, itemsList: reversedItemsList})
    } catch (err) {
        console.log(err.message)
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        let user = await User.findByPk(req.user.id)
        const itemsList = await Item.findAll({where: {userid: req.user.id}, raw: true})
        const ordersList = await Order.findAll({where: {userid: req.user.id}, raw: true})

        user = {'id': user.id, 'email': user.email, 'username': user.username}

        const reversedItemsList = itemsList.reverse()
        const reversedOrdersList = ordersList.reverse()

        res.json({user, itemsList: reversedItemsList, ordersList: reversedOrdersList})
    } catch (err) {
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})




module.exports = router