class Configuration_Error extends Error {
  constructor(message = '') {
    super(message)
    Object.setPrototypeOf(this, Configuration_Error.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  Configuration_Error,
}
