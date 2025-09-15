import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentImage: null, 
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setCurrentImage: (state, action) => {
      state.currentImage = action.payload;
    },
    clearCurrentImage: (state) => {
      state.currentImage = null;
    },
  },
});

export const { setCurrentImage, clearCurrentImage } = imageSlice.actions;
export default imageSlice.reducer;
