const {Router} = require('express')
const router = Router()
const Item = require('../models/Item')
const { Op } = require("sequelize");


router.get('/search',async (req, res) => {
    try {
        const searchItemName = req.url.substring(13)
        const items = await Item.findAll({where: {item_name: searchItemName.toString()}, raw: true})
        res.json({searchItems: items})
    } catch (err) {
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll({raw: true})

        if (items.length === 0) return res.json({empty: true})

        let allCities = []
        let minSize = items[0].size, maxSize = items[0].size
        let minPrice = items[0].price, maxPrice = items[0].price

        for (let item of items) {
            allCities.unshift(item.city)

            if (minSize > item.size) minSize = item.size
            if (maxSize < item.size) maxSize = item.size

            if (minPrice > item.price) minPrice = item.price
            if (maxPrice < item.price) maxPrice = item.price
        }

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        const cities = allCities.filter(onlyUnique)

        res.json({cities, minSize, maxSize, minPrice, maxPrice})

    } catch (err)  {
        console.log(err.message)
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

router.post('/', async (req, res) => {
    try {
        const {minPrice, maxPrice, minSize, maxSize, city, items} = req.body
        let resItems = [], whereCommand = {}

        whereCommand.price = {[Op.gte]: minPrice, [Op.lte]: maxPrice}
        whereCommand.size = {[Op.gte]: minSize, [Op.lte]: maxSize}
        if (city !== '') whereCommand.city = city

        const result = await Item.findAll({where: whereCommand, order: [['updatedAt', 'DESC']], raw: true})

        console.log(items)
        for(let item of result) {
            for (let i of items) {
                if (item.id === i.id){
                    resItems.push(item)
                }
            }
        }

        if (resItems.length === 0) {
            res.json({message: 'No result found'})
        }

        res.json({items: resItems})
    } catch (err) {
        console.log(err.message)
        res.status(400).json({message: 'Something go wrong, try again'})
    }
})

module.exports = router