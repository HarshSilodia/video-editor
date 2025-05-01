"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress"; // ShadCN UI

export default function VideoUpload() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setVideoFile(file);
        setPreviewURL(URL.createObjectURL(file));
        simulateProgress();
      }
    },
  });

  const simulateProgress = () => {
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  return (
    <div className="border border-dashed rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">📤 Upload Your Video</h2>

      <div
        {...getRootProps()}
        className="cursor-pointer p-6 border-2 border-gray-300 border-dashed rounded-md text-center hover:bg-gray-50"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag and drop your video here, or click to select a file
        </p>
      </div>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-4">
          <Progress value={uploadProgress} />
          <p className="text-sm text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
        </div>
      )}

      {uploadProgress === 100 && previewURL && (
        <div className="mt-6">
          <p className="font-medium mb-2">📽️ Video Preview:</p>
          <video
            src={previewURL}
            controls
            className="w-full max-w-md rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
