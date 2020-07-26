module.exports.HTTPError = class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};
