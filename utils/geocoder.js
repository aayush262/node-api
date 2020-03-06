const NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'opencage',
    httpAdapter: 'https',
    apiKey: 'd20bbed5db5f4c838a6caedf05a23c0a',
    formatter: null
}
module.exports = NodeGeocoder(options);
