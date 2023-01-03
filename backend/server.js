const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')

dotenv.config({ path: 'config/config.env' })

const startServer = async () => {
  await connectDatabase()

  app.listen(process.env.PORT, () => {
    console.log('app is running at ' + process.env.PORT)
  })
}

startServer()
