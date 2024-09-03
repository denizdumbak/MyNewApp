import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./ToDoReducer";

const store = configureStore({
    reducer: {
        todos: todosReducer
    }
})