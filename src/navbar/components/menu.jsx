import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { ChartDonutIcon, ClipboardTextIcon, ListIcon, MoneyIcon, PiggyBankIcon, SignOutIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ToggleSwitch from './toggle-switch/toggle-switch'

export const Menu = () => {

   const [ menuOpen, setMenuOpen ] = useState(false);

   const menuRef = useRef();

   useEffect(() => {
      let handler = (e)=>{
         if(menuRef.current && !menuRef.current.contains(e.target)){
               setMenuOpen(false);
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
         <ListIcon size={30} onClick={() => setMenuOpen(!menuOpen)}/>
         <div className={`menu-bar ${menuOpen ? "open" : ""}`} ref={menuRef}>
               <div className="close-button">
                  <XIcon size={25} onClick={() => setMenuOpen(false)}/>
               </div>
               <ToggleSwitch />
               <h2>Menu</h2>
               <hr className="line" />
               <div className="links">
                  <Link className={`link ${currentPage === "dashboard" ? "active" : ""}`} to="/dashboard" onClick={() => setMenuOpen(false)}><ChartDonutIcon size={28} /> Dashboard</Link>
                  <Link className={`link ${currentPage === "income" ? "active" : ""}`} to="/income" onClick={() => setMenuOpen(false)}><PiggyBankIcon size={28} />Income</Link>
                  <Link className={`link ${currentPage === "expense" ? "active" : ""}`} to="/expense" onClick={() => setMenuOpen(false)}><MoneyIcon size={28} /> Expense</Link>
                  <Link className={`link ${currentPage === "all" ? "active" : ""}`} to="/all" state={{ period: "all" }} onClick={() => setMenuOpen(false)}><ClipboardTextIcon size={28} /> All Records</Link>
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
