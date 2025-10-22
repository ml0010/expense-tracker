import { createContext, useState } from 'react'

export const MenuToggleContext = createContext();

export const MenuToggleContextProvider = (props) => {

    const [ showMenu, setShowMenu ] = useState(false);

    const contextValue = { showMenu, setShowMenu };

    return (
        <MenuToggleContext.Provider value={contextValue}>{props.children}</MenuToggleContext.Provider>
    )
}
