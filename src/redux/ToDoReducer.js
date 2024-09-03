import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const todosEndpoint = 'http://192.168.1.39:3000/todos'

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await axios.get(todosEndpoint);
    return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
    const response = await axios.post(todosEndpoint, newTodo);
    return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
    await axios.delete(`${todosEndpoint}/${id}`);
    return id;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message 
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.data = state.data.filter(todo => todo.id !== action.payload);
            });
    },
});

export default todosSlice.reducer;  