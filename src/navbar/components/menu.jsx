import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { ChartDonutIcon, ClipboardTextIcon, ListIcon, MoneyIcon, PiggyBankIcon, SignOutIcon, XIcon } from '@phosphor-icons/react'
import { useContext, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ToggleSwitch from './toggle-switch/toggle-switch'
import { MenuToggleContext } from '../../contexts/menu-toggle-context';

export const Menu = () => {

   const { showMenu, setShowMenu } = useContext(MenuToggleContext);

   const menuRef = useRef();

   useEffect(() => {
      let handler = (e)=>{
         if(menuRef.current && !menuRef.current.contains(e.target)){
               setShowMenu(false);
         }
      };
      document.addEventListener("mousedown", handler);
      return() =>{
         document.removeEventListener("mousedown", handler);
      }
   }, [menuRef]);

   const currentPage = useLocation().pathname.substring(1);

   const { user } = useUser();
   const { signOut } = useClerk();

   return (
      <div className="menu">
         <div className='menu-button'>
            {showMenu ? 
               <XIcon size={30} onClick={() => setShowMenu(!showMenu)}/> : 
               <ListIcon size={30} onClick={() => setShowMenu(!showMenu)}/>
            }
         </div>
         <div className={`menu-bar ${showMenu ? "open" : ""}`} ref={menuRef}>
            <ToggleSwitch />
            <h2>Menu</h2>
            <hr className="line" />
            <div className="links">
               <Link className={`link ${currentPage === "dashboard" ? "active" : ""}`} to="/dashboard" onClick={() => setShowMenu(false)}><ChartDonutIcon size={28} /> Dashboard</Link>
               <Link className={`link ${currentPage === "income" ? "active" : ""}`} to="/income" onClick={() => setShowMenu(false)}><PiggyBankIcon size={28} />Income</Link>
               <Link className={`link ${currentPage === "expense" ? "active" : ""}`} to="/expense" onClick={() => setShowMenu(false)}><MoneyIcon size={28} /> Expense</Link>
               <Link className={`link ${currentPage === "all" ? "active" : ""}`} to="/all" state={{ period: "all" }} onClick={() => setShowMenu(false)}><ClipboardTextIcon size={28} /> All Records</Link>
            </div>
            <hr className="line" />
            <div className="user">
               <div className="user-info">
                  <UserButton />
                  <div className="user-detail">
                        <p><b>{user.fullName}</b></p>
                        <p>{user.primaryEmailAddress.emailAddress}</p>
                  </div>
               </div>
               <Link className="logout-button" onClick={() => signOut({ redirectUrl: "/expense-tracker" })}><SignOutIcon size={20} /></Link>
            </div>
         </div>

         
      </div>
   )
}
