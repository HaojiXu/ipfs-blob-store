'use strict'

const promisify = require('promisify-es6')
const mfs = require('./mfs')
const log = require('debug')('ipfs:blob-store:create')
const defaultOptions = {
  ipfs: null,
  flush: true,
  baseDir: '/'
}

module.exports = promisify((opts, callback) => {
  if (typeof opts === 'function') {
    callback = opts
    opts = defaultOptions
  }

  const options = Object.assign({}, defaultOptions, opts)

  if (options.ipfs) {
    log('Using pre-configured IPFS instance')
    return setImmediate(() => callback(null, mfs(options)))
  }

  if (options.host && options.port) {
    throw new Error('Nope, this is not implemented here')
  }

  throw new Error('Nope, this is not implemented here')
})

function once (cb) {
  let called = false

  return function () {
    if (called) {
      return
    }

    called = true
    cb.apply(null, arguments)
  }
}
