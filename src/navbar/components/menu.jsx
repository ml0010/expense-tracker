import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { ChartDonutIcon, ClipboardTextIcon, MoneyIcon, PiggyBankIcon, SignOutIcon, TextIndentIcon, TextOutdentIcon } from '@phosphor-icons/react'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ToggleSwitch from './toggle-switch/toggle-switch'
import { MenuToggleContext } from '../../contexts/menu-toggle-context';
import { TransactionForm } from './transaction-form/transaction-form';
export const Menu = () => {
   return (
      <div className="menu">
         <MenuBottom />
         <TransactionForm />
         <MenuSide />
      </div>
   );
};

export const MenuSide = () => {

   const { showMenu, setShowMenu } = useContext(MenuToggleContext);
   const { user } = useUser();
   const { signOut } = useClerk();

   const currentPage = useLocation().pathname.substring(1);
   
   const [ isMenuBottom, setIsMenuBottom ] = useState(false);

   const getScreenWidth = () => {
      setIsMenuBottom( window.innerWidth <= 1100 ? true : false );
   };

   useEffect(() => {
      getScreenWidth();
      window.addEventListener("resize", setIsMenuBottom);
      return () => {
         window.removeEventListener("resize", setIsMenuBottom);
      };
   });


   let menuRef = useRef(null);
   
   useEffect(() => {
      let handler = (e)=>{
         if(showMenu && isMenuBottom && menuRef.current && !menuRef.current.contains(e.target)) {
            setShowMenu(false);
         }
      };
      document.addEventListener("mousedown", handler);
      
      return() =>{
         document.removeEventListener("mousedown", handler);
      }
   });


   return (
      <div className={`menu-side ${showMenu ? "open" : "closed"}`} ref={menuRef}>
         <div className='menu-button'>
            {showMenu ? 
               <TextOutdentIcon size={28} weight="bold" onClick={() => setShowMenu(!showMenu)}/> : 
               <TextIndentIcon size={28} weight="bold" onClick={() => setShowMenu(!showMenu)}/>
            }
         </div>
         <div className="menu-bar">
            <div className="user">
               <div className="user-info">
                  <UserButton />
                  <div className={`user-detail ${!showMenu && "hidden"}`}>
                        <p><b>{user.fullName}</b></p>
                        <p>{user.primaryEmailAddress.emailAddress}</p>
                  </div>
               </div>
               <Link className={`logout-button ${!showMenu && "hidden"}`} onClick={() => signOut({ redirectUrl: "/expense-tracker" })}>
                  <SignOutIcon size={22} weight="bold" />
               </Link>
            </div>
            <hr className="line" />
            <div className="links">
               <Link 
                  className={`link ${currentPage === "dashboard" ? "active" : ""}`} 
                  to="/dashboard" 
               >
                  <ChartDonutIcon size={22} />
                  <span className={`text ${!showMenu && "hidden"}`}>Dashboard</span>
                  <div className={`text-hover ${showMenu && "hidden"}`}>
                     <span className='text'>Dashboard</span>
                  </div>
               </Link>
               <Link 
                  className={`link ${currentPage === "income" ? "active" : ""}`} 
                  to="/income" 
               >
                  <PiggyBankIcon size={22} />
                  <span className={`text ${!showMenu && "hidden"}`}>Income</span>
                  <div className={`text-hover ${showMenu && "hidden"}`}>
                     <span className='text'>Income</span>
                  </div>
               </Link>
               <Link 
                  className={`link ${currentPage === "expense" ? "active" : ""}`} 
                  to="/expense" 
               >
                  <MoneyIcon size={22} />
                  <span className={`text ${!showMenu && "hidden"}`}>Expense</span>
                  <div className={`text-hover ${showMenu && "hidden"}`}>
                     <span className='text'>Expense</span>
                  </div>
               </Link>
               <Link 
                  className={`link ${currentPage === "all" ? "active" : ""}`} 
                  to="/all" 
                  state={{ period: "all" }} 
               >
                  <ClipboardTextIcon size={22} />
                  <span className={`text ${!showMenu && "hidden"}`}>All Records</span>
                  <div className={`text-hover ${showMenu && "hidden"}`}>
                     <span className='text'>All Records</span>
                  </div>
               </Link>
            </div>
            <hr className="line" />
            <ToggleSwitch />
         </div>
      </div>
   )
}

export const MenuBottom = () => {
   
   const currentPage = useLocation().pathname.substring(1);

   return (
      <div className="menu-bottom">
         <div className="menu-bar">
            <div className="links">
               <Link 
                  className={`link ${currentPage === "dashboard" ? "active" : ""}`} 
                  to="/dashboard" 
               >
                  <ChartDonutIcon size={23} weight="fill" />
                  <span className="text">Dashboard</span>
               </Link>
               <Link 
                  className={`link ${currentPage === "income" ? "active" : ""}`} 
                  to="/income" 
               >
                  <PiggyBankIcon size={23} weight="fill" />
                  <span className="text">Income</span>

               </Link>
               <Link 
                  className={`link ${currentPage === "expense" ? "active" : ""}`} 
                  to="/expense" 
               >
                  <MoneyIcon size={23} weight="fill" />
                  <span className="text">Expense</span>
               </Link>
               <Link 
                  className={`link ${currentPage === "all" ? "active" : ""}`} 
                  to="/all" 
                  state={{ period: "all" }} 
               >
                  <ClipboardTextIcon size={23} weight="fill" />
                  <span className="text">All Records</span>
               </Link>
            </div>
         </div>
      </div>
   )
}
