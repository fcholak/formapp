import AWS from "aws-sdk";

const bucketName = import.meta.env.VITE_AWS_S3_BUCKET_NAME;
const region = import.meta.env.VITE_AWS_S3_REGION;
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const secretKey = import.meta.env.VITE_AWS_SECRET;

function initializeS3Bucket() {
  return new AWS.S3({
    params: { Bucket: bucketName },
    region: region,
    secretAccessKey: secretKey,
    accessKeyId: accessKeyId,
    signatureVersion: "v4",
  });
}
export { initializeS3Bucket };
