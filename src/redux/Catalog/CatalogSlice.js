import { createSlice } from "@reduxjs/toolkit";
import { fetchCatalog } from "./operations";

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        items: [],
        isLoading: false,
        error: false,
    },
    extraReducers: builder => {
        builder
        .addCase(fetchCatalog.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchCatalog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.items = action.payload;
        })
        .addCase(fetchCatalog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const CatalogReducer = catalogSlice.reducer;