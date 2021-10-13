const responses = (message, statusCode, data, aditionalData = {}) => {
  return Object.assign({}, aditionalData, {
    message,
    status_code: statusCode,
    data,
  })
}

module.exports = {
  responses
}