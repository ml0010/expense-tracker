import { ChartDonutIcon, ClipboardTextIcon, DotsThreeOutlineIcon, HandCoinsIcon, WalletIcon, XIcon } from '@phosphor-icons/react'
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

    return (
        <div className="menu">
            <DotsThreeOutlineIcon size={30} onClick={() => setMenuOpen(!menuOpen)}/>
            <div className={`menu-bar ${menuOpen ? "open" : ""}`} ref={menuRef}>
                <XIcon className="close-button" size={30} onClick={() => setMenuOpen(false)}/>
                <div className="links">
                    <Link className={`link ${currentPage === "dashboard" ? "active" : ""}`} to="dashboard" onClick={() => setMenuOpen(false)}><ChartDonutIcon size={28} /> Dashboard</Link>
                    <Link className={`link ${currentPage === "income" ? "active" : ""}`} to="income" onClick={() => setMenuOpen(false)}><HandCoinsIcon size={28} />Income</Link>
                    <Link className={`link ${currentPage === "expense" ? "active" : ""}`} to="expense" onClick={() => setMenuOpen(false)}><WalletIcon size={28} /> Expense</Link>
                    <Link className={`link ${currentPage === "expense" ? "active" : ""}`} to="all" onClick={() => setMenuOpen(false)}><ClipboardTextIcon size={28} /> All Records</Link>
                </div>
            </div>
        </div>
    )
}
