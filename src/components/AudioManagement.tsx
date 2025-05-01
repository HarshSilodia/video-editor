"use client";

import { useState, useCallback } from "react";
import { nanoid } from "nanoid";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type AudioClip = {
  id: string;
  name: string;
  url: string;
  muted: boolean;
  isBGM?: boolean;
};

const AudioClipBox = ({
  clip,
  index,
  moveClip,
  toggleMute,
}: {
  clip: AudioClip;
  index: number;
  moveClip: (from: number, to: number) => void;
  toggleMute: (id: string) => void;
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "AUDIO_CLIP",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "AUDIO_CLIP",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveClip(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) dragRef(dropRef(node));
      }}
      className={`w-44 bg-blue-100 border rounded-md p-3 flex flex-col items-center text-xs transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <p className="font-semibold text-center mb-1 truncate w-full">{clip.name}</p>

      <audio controls src={clip.url} muted={clip.muted} className="w-full" />

      <div className="mt-2 flex gap-2">
        <button
          onClick={() => toggleMute(clip.id)}
          className={`px-2 py-1 rounded text-white ${
            clip.muted ? "bg-gray-500" : "bg-red-500"
          }`}
        >
          {clip.muted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

export default function AudioManagement() {
  const [clips, setClips] = useState<AudioClip[]>([]);

  const moveClip = useCallback((from: number, to: number) => {
    setClips((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }, []);

  const toggleMute = (id: string) => {
    setClips((prev) =>
      prev.map((clip) =>
        clip.id === id ? { ...clip, muted: !clip.muted } : clip
      )
    );
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const audioUrl = URL.createObjectURL(file);
    const newClip: AudioClip = {
      id: nanoid(),
      name: file.name,
      url: audioUrl,
      muted: false,
    };
    setClips((prev) => [...prev, newClip]);
  };

  const addBackgroundMusic = () => {
    const bgmClip: AudioClip = {
      id: nanoid(),
      name: "Background Music (Stub)",
      url: "/sample-bgm.mp3", // can be a placeholder file
      muted: false,
      isBGM: true,
    };
    setClips((prev) => [...prev, bgmClip]);
  };

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">🎵 Audio Management</h2>

      {/* Static waveform bar */}
      <div className="w-full h-12 bg-gray-300 rounded mb-4 flex items-center justify-center text-gray-700">
        [ Static Waveform Display ]
      </div>

      {/* Upload section */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label className="text-sm font-medium">Upload Audio File:</label>
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        <button
          onClick={addBackgroundMusic}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Background Music (Stub)
        </button>
      </div>

      {/* Audio Clip Strip */}
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-4 overflow-x-auto">
          {clips.map((clip, index) => (
            <AudioClipBox
              key={clip.id}
              clip={clip}
              index={index}
              moveClip={moveClip}
              toggleMute={toggleMute}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
}
