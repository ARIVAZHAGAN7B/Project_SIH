import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import galleryReducer from "./gallerySlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    gallery: galleryReducer,
  },
});
