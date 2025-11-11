import { ArrowUpIcon } from '@phosphor-icons/react';
import { useContext } from 'react'
import './scroll-to-top.css'
import { MenuToggleContext } from '../../../contexts/menu-toggle-context';

export const ScrollToTop = () => {
   const { showScrollBttn } = useContext(MenuToggleContext);   

   const handleScrollToTop = () => {
      document.getElementById("pages").scrollTo({ top: 0, behavior: 'smooth'});
   };

   return (
      <div className={`scroll-to-top ${showScrollBttn ? 'active' : 'inactive'}`}>
         <button className={`scroll-button ${showScrollBttn ? 'active' : 'inactive'}`} onClick={handleScrollToTop}>
            <div className="text">Scroll To Top</div>
            <ArrowUpIcon size={25} />
         </button>
      </div>
   )
}
