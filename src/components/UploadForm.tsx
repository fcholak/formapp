/// <reference types="aws-sdk" />
import { useState } from "react";
import { initializeS3Bucket } from "../utils/awsConfig.js";

export default function UploadForm() {
  const bucketName = import.meta.env.VITE_AWS_S3_BUCKET_NAME;
  const documentBucket = initializeS3Bucket();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadFile = (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: bucketName,
      Key: file.name,
    };

    documentBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  function handleFile(e: any) {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: "#e4e4e4",
        margin: "auto",
        width: "50%",
        padding: "40px",
      }}
    >
      <h4>Upload progress: {progress}%</h4>
      <input type="file" onChange={handleFile} />
      <button
        style={{
          marginTop: "30px",
          borderRadius: "5px",
        }}
        onClick={() => uploadFile(selectedFile)}
      >
        Upload PDF
      </button>
    </div>
  );
}
