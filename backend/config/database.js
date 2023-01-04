const mongoose = require('mongoose')

const connectDatabase = () => {
  return mongoose
    .set('strictQuery', true)
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`databse connected with server ${data.connection.host}`)
    })
}
module.exports = connectDatabase
