// ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('default'); // 'default', 'dark', 'light'

    const changeTheme = (mode) => {
        setThemeMode(mode);
    };

    return (
        <ThemeContext.Provider value={{ themeMode, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
