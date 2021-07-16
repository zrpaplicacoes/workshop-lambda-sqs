const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const { toResponse } = require("@workshop/shared");

AWS.config.update({ region: process.env.AWS_REGION });

const s3 = new AWS.S3({ signatureVersion: 'v4' });
const bucket = "workshop-lambda-sqs"

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300;

const getUploadURL = async function(event) {
  const Key = `uploads/${v4()}.jpg`;

  // Get signed URL from S3
  const s3Params = {
    Bucket: bucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: "image/jpeg"
  };

  console.log("Params: ", s3Params);
  const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);

  return toResponse({
    uploadURL,
    Key,
  });
};

// Main Lambda entry point
module.exports = {
  upload: async (event) => await getUploadURL(event)
};

