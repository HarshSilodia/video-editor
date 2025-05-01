"use client";

import { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { nanoid } from "nanoid";

type Scene = {
  id: string;
  label: string;
};

const SceneBox = ({
  scene,
  index,
  moveScene,
  removeScene,
}: {
  scene: Scene;
  index: number;
  moveScene: (from: number, to: number) => void;
  removeScene: (id: string) => void;
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "SCENE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "SCENE",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveScene(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) dragRef(dropRef(node));
      }}
      className={`w-32 h-36 bg-white border rounded-md flex flex-col justify-between items-center p-2 shadow-sm transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Mock thumbnail */}
      <div className="w-full h-14 bg-gray-300 rounded-sm mb-1" />

      <p className="text-xs font-medium">{scene.label}</p>

      {/* Mock Controls */}
      <div className="flex flex-wrap justify-center gap-1 mt-1 text-[10px]">
        <button
          title="Cut this scene (UI only)"
          className="bg-yellow-400 text-black px-2 py-1 rounded"
        >
          Cut
        </button>
        <button
          title="Edit this scene (UI only)"
          className="bg-blue-600 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          title="Remove this scene"
          onClick={() => removeScene(scene.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default function VideoTimeline() {
  const [scenes, setScenes] = useState<Scene[]>([
    { id: nanoid(), label: "Scene 1" },
    { id: nanoid(), label: "Scene 2" },
  ]);

  const addScene = () => {
    const newScene: Scene = {
      id: nanoid(),
      label: `Scene ${scenes.length + 1}`,
    };
    setScenes((prev) => [...prev, newScene]);
  };

  const removeScene = (id: string) => {
    setScenes((prev) => prev.filter((scene) => scene.id !== id));
  };

  const moveScene = useCallback((from: number, to: number) => {
    setScenes((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }, []);

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">🎞️ Video Timeline</h2>

      {/* Add Scene Button */}
      <button
        onClick={addScene}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Scene
      </button>

      {/* Timeline Strip */}
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-4 overflow-x-auto py-2">
          {scenes.map((scene, index) => (
            <SceneBox
              key={scene.id}
              scene={scene}
              index={index}
              moveScene={moveScene}
              removeScene={removeScene}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
}
