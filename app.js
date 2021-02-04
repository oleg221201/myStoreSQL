const express = require('express')
const sequelize = require('./db')
const path = require('path')

const app = express()

const port = process.env.PORT || 4000

app.use(express.json({extended: true}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/item', require('./routes/item'))
app.use('/api/filter', require('./routes/filter'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}


async function startApp () {
    try {
        await sequelize.sync()
        app.listen(port, () => {
            console.log(`Server has been started on port ${port} ...`)
        })
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

startApp()