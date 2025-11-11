import { createContext, useState } from 'react'

export const MenuToggleContext = createContext();

export const MenuToggleContextProvider = (props) => {

   const [ showMenu, setShowMenu ] = useState(false);
   const [ showTransactionForm, setShowTransactionForm ] = useState(false);
   const [ showScrollBttn, setShowScrollBttn ] = useState(false);   

   const handleScrollButttonVisibility = () => {
      document.getElementById("pages").scrollTop > 150 ? setShowScrollBttn(true) : setShowScrollBttn(false);
   };
   const contextValue = { showMenu, setShowMenu, showTransactionForm, setShowTransactionForm, showScrollBttn, setShowScrollBttn, handleScrollButttonVisibility };

   return (
      <MenuToggleContext.Provider value={contextValue}>{props.children}</MenuToggleContext.Provider>
   )
}
