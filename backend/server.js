const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')

dotenv.config({ path: 'config/config.env' })

process.on('uncaughtException', (err) => {
  console.log(`Error :${err.message}`)
  console.log('Shutting down the server ')
  Server.close(() => {
    process.exit(1)
  })
})
const Server = app.listen(process.env.PORT, () => {
  console.log('app is running at ' + process.env.PORT)
})

process.on('unhandledRejection', (err) => {
  console.log(`Error :${err.message}`)
  console.log('Shutting down the server ')
  Server.close(() => {
    process.exit(1)
  })
})
connectDatabase()
