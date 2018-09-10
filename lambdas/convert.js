'use strict';

const converter = require('../libs/converter');

module.exports.handler = (event, context, callback) => {
  const res = converter.init(event, context);
  callback(null, res)
}