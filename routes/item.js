const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Item = require('../models/Item')
const Order = require('../models/Order')
const {check, validationResult} = require('express-validator')


router.get('/all', async (req, res) => {
    try {
        const items = await Item.findAll({order: [['updatedAt', 'DESC']]});

        res.json({items})
    } catch (err) {
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id)

        if (!item) {
            res.status(400).json({message: 'Item with this id is not found'})
        }

        res.json({item})
    } catch (err) {
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const item = req.body
        await Item.create({userid: req.user.id, item_name: item.name, price: item.price,
            size: item.size, city: item.city}).then(result => {
                res.json({itemId: result.id, message: 'Item successfully created'})
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const item = req.body
        await Item.update({item_name: item.item_name, price: item.price,
            size: item.size, city: item.city}, {where: {id: req.params.id}})
        res.json({message: 'Item successfully updated'})
    } catch (err) {
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Order.destroy({where: {itemid: req.params.id}})
        await Item.destroy({where: {id: req.params.id}})
        res.json({message: 'Item successfully deleted'})
    } catch (e) {
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

router.post('/order',
    [
        check('clientEmail', 'Invalid email').isEmail()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({
                message: 'Invalid data',
                err: errors.array()
            })
        }

        const order = req.body

        const item = await Item.findByPk(order.itemId)

        await Order.create({userid: item.userid, itemid: order.itemId, count: order.count,
            clientEmail: order.clientEmail, clientName: order.clientName, clientCity: order.clientCity})

        res.json({message: 'Order successfully added'})
    } catch (e) {
        res.status(400).json({err: e.message, message: 'Something go wrong, try again'})
    }
})

router.delete('/order/:id', auth, async (req, res) => {
    try {
        await Order.destroy({where: {id: req.params.id}})

        const ordersList = await Order.findAll({where: {userid: req.user.id}, raw: true})
        const reversedOrders = ordersList.reverse()
        res.json({ordersList: reversedOrders, message: 'Order successfully deleted'})
    } catch (e) {
        res.status(400).json({err: e.message, message: 'Something go wrong, try again'})
    }
})


module.exports = router