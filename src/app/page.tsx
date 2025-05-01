"use client";

import VideoUpload from "@/components/VideoUpload";

import VideoTimeline from "@/components/VideoTimeline";

import AudioManagement from "@/components/AudioManagement";
import SubtitleOverlay from "@/components/SubtitleOverlay";
import ImageOverlay from "@/components/ImageOverlay";
import VideoPreview from "@/components/VideoPreview";

export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🎬 Video Editor</h1>
      <VideoUpload />
      <VideoTimeline />
      <AudioManagement />
      <SubtitleOverlay />
      <ImageOverlay />
      <VideoPreview />
    </main>
  );
}
