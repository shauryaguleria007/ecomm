class ApiFeatures {
  constructor(query, queryValue) {
    this.query = query
    this.queryValue = queryValue
  }
  searchValue() {
    const value = this.queryValue.search
      ? {
          name: {
            $regex: this.queryValue.search,
            $options: 'i',
          },
        }
      : {}

    this.query = this.query.find({ ...value })
    return this
  }
  filter() {
    const queryCopy = { ...this.queryValue }
    const removeFields = ['search', 'page', 'limit']
    removeFields.forEach((key) => delete queryCopy[key])
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
    queryStr = JSON.parse(queryStr)
    this.query = this.query.find(queryStr)
    return this
  }
}

module.exports = ApiFeatures
