import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, child } from "firebase/database";
import { database } from "../../config/firebaseConfig";

export const fetchCatalog = createAsyncThunk('catalog/fetchAll', async (_, thunkAPI) => {
    try {
        const dbRef = ref(database); // Отримуємо посилання на базу даних
        const snapshot = await get(child(dbRef, '/teachers')); // Використовуємо 'child' щоб отримати шлях '/teachers'

        if (snapshot.exists()) {
            const data = snapshot.val();
            const object = Object.values(data);
            return object;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
