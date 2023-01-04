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
    let queryCopy = {
      ...this.queryValue,
    }
    if (Array.isArray(queryCopy.category))
      queryCopy = { ...queryCopy, category: { $in: this.queryValue.category } }
    const removeFields = ['search', 'page', 'limit']
    removeFields.forEach((key) => delete queryCopy[key])
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
    queryStr = JSON.parse(queryStr)
    this.query = this.query.find(queryStr)
    return this
  }
  paginate(resultPerPage) {
    let requiredPage = 1
    if (this.queryValue.page && Number(this.queryValue.page))
      requiredPage = Number(this.queryValue.page)
    const skipResults = (requiredPage - 1) * resultPerPage
    this.querry = this.query.limit(resultPerPage).skip(skipResults)
    return this
  }
}

module.exports = ApiFeatures
