const { AsyncError } = require('../middleware')

const isAuthenticated = AsyncError(() => {})

module.exports = isAuthenticated
