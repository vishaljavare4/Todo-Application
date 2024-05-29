import { createContext, useContext, useReducer } from "react";
import { ThemeProvider } from "./ThemeContext";

const TODOContext = createContext();

const initialState = {
    todo: [],
    fav: [],
    theme: "dark"
};

const TodoReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todo: [...state.todo, action.payload],
            };
        case "DELETE_TODO":
            return {
                ...state,
                todo: state.todo.filter(each => each.id !== action.payload),
            };
        case "EDIT_TODO":
            return {
                ...state,
                todo: state.todo.map(todo =>
                    todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo
                ),
            };
        case "ADD_FAV":
            return {
                ...state,
                fav: [...state.fav, action.payload]
            };
        default:
            return state;
    }
};

export const TODOProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TodoReducer, initialState);
    return (
        <ThemeProvider>
            <TODOContext.Provider value={{ state, dispatch }}>
                {children}
            </TODOContext.Provider> 
        </ThemeProvider>
    );
};

export default TODOContext;