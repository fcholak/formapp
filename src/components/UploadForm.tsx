/// <reference types="aws-sdk" />
import { useState } from "react";
import { initializeS3Bucket } from "../utils/awsConfig.js";
import { Center, Input, Button, Flex } from "@chakra-ui/react";

export default function UploadForm() {
  const bucketName = import.meta.env.VITE_AWS_S3_BUCKET_NAME;
  const documentBucket = initializeS3Bucket();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentTitle, setDocumentTitle] = useState(null);

  const uploadFile = (file: HTMLInputElement) => {
    let params = {
      ACL: "public-read",
      Body: file,
      Bucket: bucketName,
      Key: file?.name,
    };

    documentBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (!params.Bucket) {
          console.log("Please select a file!");
        }
      });
  };

  function handleFile(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  const handleOnChange = (e) => {
    setDocumentTitle(e.target.value);
  };

  return (
    <Center m={50}>
      <Flex direction="column" justify="center">
        <Input
          variant="filled"
          size="md"
          placeholder="Enter file name"
          onChange={handleOnChange}
        />
        <h4>Upload progress: {progress}%</h4>
        <Input variant="unstyled" type="file" onChange={handleFile} />
        <Button onClick={() => uploadFile(selectedFile)}>Upload</Button>
      </Flex>
    </Center>
  );
}
