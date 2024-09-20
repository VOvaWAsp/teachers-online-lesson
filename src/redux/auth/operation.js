import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import axios from "axios";

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ``;
};

export const registered = createAsyncThunk('auth/register', async ({ email, password }, thunkAPI) => {
    try {
        console.log('Registering user');
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const token = await response.user.getIdToken();
        setAuthHeader(token);
        console.log('Registration successful');
        return { user: response.user, token: token };
    } catch (error) {
        console.log('Registration error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const token = await response.user.getIdToken();
        setAuthHeader(token);
        return { user: response.user, token: token };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Затримка перед виходом
        await signOut(auth);
        clearAuthHeader();
        thunkAPI.dispatch(refreshUser());
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});



export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
        return thunkAPI.rejectWithValue('No token found');
    }

    try {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken(true);
            setAuthHeader(token);
            return { user: user, token: token };
        } else {
            throw new Error('User not authenticated');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
