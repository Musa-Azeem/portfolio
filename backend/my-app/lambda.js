const serverless = require("serverless-http");
const app = require('./app')

// AWS Lambda
module.exports.handler = serverless(app);