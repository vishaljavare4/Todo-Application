import { createContext, useReducer } from "react";

const ThemeContext = createContext();

const themeInitialState = {
    isDarkMode: true,
};

const themeReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_THEME":
            return { isDarkMode: !state.isDarkMode };
        default:
            return state;
    }
};

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, themeInitialState);
    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;