'use strict';

const { toResponse } = require('@workshop/shared');

async function hello(event) {
  const contents = {
    message: "Go Serverless v1.0! Your function executed successfully!",
    event,
  };

  return toResponse(contents);
};

module.exports = { hello }
