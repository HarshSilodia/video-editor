import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Scene {
  id: string;
  name: string;
}

interface EditorState {
  timeline: Scene[];
}

const initialState: EditorState = {
  timeline: [],
};

const videoEditorSlice = createSlice({
  name: "videoEditor",
  initialState,
  reducers: {
    addScene: (state, action: PayloadAction<Scene>) => {
      state.timeline.push(action.payload);
    },
    removeScene: (state, action: PayloadAction<string>) => {
      state.timeline = state.timeline.filter(scene => scene.id !== action.payload);
    },
  },
});

export const { addScene, removeScene } = videoEditorSlice.actions;
export default videoEditorSlice.reducer;
