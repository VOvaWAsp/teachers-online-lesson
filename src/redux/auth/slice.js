import { createSlice } from "@reduxjs/toolkit";
import { login, logOut, refreshUser, registered } from "./operation";

const authSLice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(registered.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })
        .addCase(logOut.fulfilled, (state, action) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            state.error = null;
        })        
        .addCase(refreshUser.pending, (state, action) => {
            state.isRefreshing = true;
        })
        .addCase(refreshUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.isRefreshing = false;
        })
        .addCase(refreshUser.rejected, (state, action) => {
                state.isRefreshing = false;
                state.error = action.payload;
        })
    }
})

export const authReducer = authSLice.reducer;