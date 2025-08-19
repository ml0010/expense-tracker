import { createContext, useState } from 'react'

export const DarkModeContext = createContext();

export const DarkModeContextProvider = (props) => {

    const [ darkMode, setDarkMode ] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        console.log(`DARKMODE ${darkMode? 'OFF' : 'ON'}`);
    };

    const contextValue = { darkMode, toggleDarkMode };

    return (
        <DarkModeContext.Provider value={contextValue}>{props.children}</DarkModeContext.Provider>
    )
}
