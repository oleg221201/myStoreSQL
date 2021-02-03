const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')


router.post('/registration',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimum length of password is 5 symbols').isLength({min: 5}),
        check('username', 'Type username').isLength({min: 1})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({
                    message: 'Invalid register data',
                    err: errors.array()
                })
            }

            const {email, password, username} = req.body

            if(await User.findOne({where: {email: email}})){
                return res.json({message: 'User already exists'})
            }

            if(await User.findOne({where: {username: username}})){
                return res.json({message: 'User with this username already exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            await User.create({email, password: hashedPassword, username}).then(result => {
                const token = jwt.sign(
                    {id: result.id},
                    'VerySecretKey',
                    {expiresIn: '96h'}
                )
                res.status(201).json({token: token, userId: result.id})
            })

        } catch (err) {
            res.json({message: 'Something go wrong, try again', err: err.message})
        }
})

router.post('/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({
                    message: 'Invalid login data',
                    err: errors.array()
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({raw: true, where: {email: email}})

            if(!user){
                return res.json({message: 'Something go wrong, try again'})
            }

            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                return res.json({message: 'Something go wrong, try again'})
            }

            const token = jwt.sign(
                {id: user.id},
                'VerySecretKey',
                {expiresIn: '96h'}
            )

            res.status(201).json({token: token, userId: user.id})
        } catch (err) {
            res.json({message: 'Something go wrong, try again'})
        }
    })

module.exports = router