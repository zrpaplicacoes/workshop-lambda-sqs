const AWS = require("aws-sdk");

const s3 = new AWS.S3({ signatureVersion: "v4" });

const start = async (event) => {
  // TODO: Enviar mensagem para iniciar o jogo

  return true;
};

const play = async () => {
  // TODO: Implementar o jogo
  // s3.getObject({ Bucket: "workshop-lambda-sqs", Key }).promise();
};

module.exports = {
  start,
  play,
};
