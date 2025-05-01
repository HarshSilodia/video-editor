"use client";

import { useState } from "react";
import { Loader2, Download, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoPreview() {
  const [isRendering, setIsRendering] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const simulateRender = () => {
    setIsRendering(true);
    // Simulate rendering delay
    setTimeout(() => {
      setVideoUrl("/sample.mp4"); // Replace with real or exported file path
      setIsRendering(false);
    }, 3000);
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "exported_video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">🎬 Preview & Render</h2>

      {/* Video Player */}
      <div className="relative w-full max-w-3xl mx-auto bg-black rounded-md">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            className="w-full h-[300px] object-contain"
          />
        ) : (
          <div className="h-[300px] flex items-center justify-center text-white text-sm">
            No preview available. Click "Render" to simulate output.
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={simulateRender}
          disabled={isRendering}
          className="bg-green-600 text-white"
        >
          {isRendering ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Rendering...
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              Render
            </>
          )}
        </Button>

        <Button
          onClick={handleDownload}
          disabled={!videoUrl || isRendering}
          className="bg-blue-600 text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
