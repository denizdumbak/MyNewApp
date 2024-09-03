import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./ToDoReducer";
import usersReducer from "./UserReducer";

const store = configureStore({
    reducer: {
        todos: todosReducer,
        users: usersReducer,
    }
})