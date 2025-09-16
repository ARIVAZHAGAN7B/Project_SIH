import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    savedImage: []
};

const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        addOneImage: (state, action) => {
            state.savedImage.push(action.payload);
        },
        addMultiImages: (state, action) => {
            state.savedImage = [...state.savedImage, ...action.payload];
        },
        removeImage: (state, action) => {
            state.savedImage = state.savedImage.filter(
                (img) => img != action.payload
            );
        },
        clearImages: (state) => {
            state.savedImage = [];
        }
    }
});

export const { addOneImage, addMultiImages, removeImage, clearImages } = gallerySlice.actions;
export default gallerySlice.reducer;