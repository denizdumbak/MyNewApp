import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const usersEndpoint = 'http://192.168.1.39:3000/users'

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get(usersEndpoint);
    return response.data;
})

export const addUsers = createAsyncThunk("users/addUser", async (newUser) => {
    const response = await axios.post(usersEndpoint, newUser);
    return response.data;
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
    await axios.delete(`${usersEndpoint}/${id}`);
    return id;
})

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
    const response = await axios.patch(`${usersEndpoint}/${data.id}`, data);
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addUsers.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const existingUserIndex = state.data.findIndex(user => user.id === action.payload.id)

                if(existingUserIndex !== -1) {
                    state.data[existingUserIndex] = action.payload;
                } else {
                    console.error('User not found in state', action.payload);
                }
            })
    },
});

export default usersSlice.reducer;