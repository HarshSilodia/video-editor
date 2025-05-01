"use client";

import { useRef, useState } from "react";

export default function ImageOverlay() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(1);
  const [border, setBorder] = useState<boolean>(true);
  const [animation, setAnimation] = useState<boolean>(false);
  const [size, setSize] = useState<number>(150);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const parent = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setPosition({
      x: e.clientX - parent.left - size / 2,
      y: e.clientY - parent.top - size / 2,
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="border rounded-md p-4 shadow-sm select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h2 className="text-xl font-semibold mb-4">🖼️ Image Overlay</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm">
          Opacity:
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.1}
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Size:
          <input
            type="range"
            min={50}
            max={400}
            step={10}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={border}
            onChange={(e) => setBorder(e.target.checked)}
          />
          Show Border
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={animation}
            onChange={(e) => setAnimation(e.target.checked)}
          />
          Pulse Animation
        </label>
      </div>

      <div className="relative bg-black rounded-md w-full h-[300px] overflow-hidden">
        {preview ? (
          <div
            ref={overlayRef}
            onMouseDown={handleMouseDown}
            className={`absolute cursor-move ${
              border ? "border-2 border-white" : ""
            } ${animation ? "animate-pulse" : ""}`}
            style={{
              top: position.y,
              left: position.x,
              width: size,
              opacity,
            }}
          >
            <img src={preview} alt="overlay" className="w-full h-auto" />
          </div>
        ) : (
          <p className="text-white text-center pt-28">
            No overlay image uploaded
          </p>
        )}
      </div>
    </div>
  );
}