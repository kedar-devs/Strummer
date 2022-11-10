const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.DB_ConnectionString
try {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('connection established successfully')
    })

} catch (err) {
    console.log(err)
}