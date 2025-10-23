import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { ChartDonutIcon, ClipboardTextIcon, ListIcon, MoneyIcon, PiggyBankIcon, SignOutIcon, XIcon } from '@phosphor-icons/react'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ToggleSwitch from './toggle-switch/toggle-switch'
import { MenuToggleContext } from '../../contexts/menu-toggle-context';

export const Menu = () => {

   const { showMenu, setShowMenu } = useContext(MenuToggleContext);

   
   const currentPage = useLocation().pathname.substring(1);

   const { user } = useUser();
   const { signOut } = useClerk();

   return (
      <div className={`menu ${showMenu && "open"}`}>
         <div className='menu-button'>
            {showMenu ? 
               <XIcon size={30} onClick={() => setShowMenu(!showMenu)}/> : 
               <ListIcon size={30} onClick={() => setShowMenu(!showMenu)}/>
            }
         </div>
         <div className={`menu-bar ${showMenu && "open"}`}>
            <ToggleSwitch />
            <hr className="line" />
            <div className="links">
               <Link 
                  className={`link ${currentPage === "dashboard" ? "active" : ""}`} 
                  to="/dashboard" 
               >
                  <ChartDonutIcon size={28} />
                  <span className={`text ${!showMenu && "hidden"}`}>Dashboard</span>
               </Link>
               <Link 
                  className={`link ${currentPage === "income" ? "active" : ""}`} 
                  to="/income" 
               >
                  <PiggyBankIcon size={28} />
                  <span className={`text ${!showMenu && "hidden"}`}>Income</span>
               </Link>
               <Link 
                  className={`link ${currentPage === "expense" ? "active" : ""}`} 
                  to="/expense" 
               >
                  <MoneyIcon size={28} />
                  <span className={`text ${!showMenu && "hidden"}`}>Expense</span>
               </Link>
               <Link 
                  className={`link ${currentPage === "all" ? "active" : ""}`} 
                  to="/all" 
                  state={{ period: "all" }} 
               >
                  <ClipboardTextIcon size={28} />
                  <span className={`text ${!showMenu && "hidden"}`}>All Records</span>
               </Link>
            </div>
            <hr className="line" />
            <div className="user">
               <div className="user-info">
                  <UserButton />
                  <div className={`user-detail ${!showMenu && "hidden"}`}>
                        <p><b>{user.fullName}</b></p>
                        <p>{user.primaryEmailAddress.emailAddress}</p>
                  </div>
               </div>
               <Link className={`logout-button ${!showMenu && "hidden"}`} onClick={() => signOut({ redirectUrl: "/expense-tracker" })}><SignOutIcon size={20} /></Link>
            </div>
         </div>

         
      </div>
   )
}
