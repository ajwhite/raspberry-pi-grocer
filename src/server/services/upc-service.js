var Promise = require('bluebird'),
    request = Promise.promisify(require('request')),
    Config = require('../../../.env.json'),
    BASE_URL = 'http://api.upcdatabase.org/json';

module.exports = {
  getProductByUpc: function (upc) {
    var endpoint = BASE_URL + '/' + Config.upcdatabase.api_key + '/' + upc;
    return request(endpoint).spread(function (response, body) {
      return JSON.parse(body);
    }).then(function (product) {
      product.valid = JSON.parse(product.valid);
      if (!product.valid) {
        throw new Error(product.reason);
      }
      if (!product.itemname && !product.description) {
        throw new Error('No product data available');
      }
      return product;
    });
  }
};
