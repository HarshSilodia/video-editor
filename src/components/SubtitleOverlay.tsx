"use client";

import { useState } from "react";
import { nanoid } from "nanoid";

type Subtitle = {
  id: string;
  text: string;
  start: string;
  end: string;
  fontSize: string;
  color: string;
  position: string;
};

export default function SubtitleOverlay() {
  const [input, setInput] = useState<Partial<Subtitle>>({});
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  const handleChange = (field: keyof Subtitle, value: string) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const addSubtitle = () => {
    if (!input.text || !input.start || !input.end) return;
    const newSubtitle: Subtitle = {
      id: nanoid(),
      text: input.text,
      start: input.start,
      end: input.end,
      fontSize: input.fontSize || "16px",
      color: input.color || "#ffffff",
      position: input.position || "bottom",
    };
    setSubtitles((prev) => [...prev, newSubtitle]);
    setInput({});
  };

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">📝 Subtitles & Text Overlay</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <input
          placeholder="Subtitle text"
          value={input.text || ""}
          onChange={(e) => handleChange("text", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Start time (e.g., 00:01)"
          value={input.start || ""}
          onChange={(e) => handleChange("start", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="End time (e.g., 00:05)"
          value={input.end || ""}
          onChange={(e) => handleChange("end", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Font size (e.g., 16)"
          value={input.fontSize || ""}
          onChange={(e) => handleChange("fontSize", e.target.value + "px")}
          className="border p-2 rounded"
        />
        <input
          type="color"
          value={input.color || "#ffffff"}
          onChange={(e) => handleChange("color", e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={input.position || ""}
          onChange={(e) => handleChange("position", e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Position</option>
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>

      <button
        onClick={addSubtitle}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Subtitle
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">🎬 Subtitle Blocks:</h3>
        {subtitles.length === 0 ? (
          <p className="text-gray-500">No subtitles added yet.</p>
        ) : (
          <ul className="space-y-2">
            {subtitles.map((s) => (
              <li
                key={s.id}
                className="p-2 border rounded-md bg-gray-50 flex justify-between"
              >
                <div>
                  <p>
                    <span className="font-semibold">Text:</span> {s.text}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span> {s.start} - {s.end}
                  </p>
                  <p>
                    <span className="font-semibold">Style:</span>{" "}
                    {s.fontSize}, {s.color}, {s.position}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
