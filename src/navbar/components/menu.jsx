import { useClerk, useUser } from '@clerk/clerk-react';
import { ChartDonutIcon, ClipboardTextIcon, DotsThreeIcon, DotsThreeOutlineIcon, MoneyIcon, PiggyBankIcon, SignOutIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

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
            <DotsThreeIcon size={30} onClick={() => setMenuOpen(!menuOpen)}/>
            <div className={`menu-bar ${menuOpen ? "open" : ""}`} ref={menuRef}>
                <div className="close-button">
                    <XIcon size={30} onClick={() => setMenuOpen(false)}/>
                </div>
                <p className="username">{user.fullName}</p>
                <div className="links">
                    <Link className={`link ${currentPage === "dashboard" ? "active" : ""}`} to="dashboard" onClick={() => setMenuOpen(false)}><ChartDonutIcon size={28} /> Dashboard</Link>
                    <Link className={`link ${currentPage === "income" ? "active" : ""}`} to="income" onClick={() => setMenuOpen(false)}><PiggyBankIcon size={28} />Income</Link>
                    <Link className={`link ${currentPage === "expense" ? "active" : ""}`} to="expense" onClick={() => setMenuOpen(false)}><MoneyIcon size={28} /> Expense</Link>
                    <Link className={`link ${currentPage === "all" ? "active" : ""}`} to="all" onClick={() => setMenuOpen(false)}><ClipboardTextIcon size={28} /> All Records</Link>
                    <Link className={`link logout-button`} onClick={() => signOut({ redirectUrl: "/" })}><SignOutIcon size={28} />Sign Out</Link>
                </div>
            </div>
        </div>
    )
}
