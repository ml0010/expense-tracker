import { ArrowUpIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react'
import './scroll-to-top.css'

export const ScrollToTop = () => {
   const [ showScrollBttn, setShowScrollBttn ] = useState(false);   

   const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth'});
   };
   useEffect(() => {
      const handleScrollBttnVisibility = () => {
         window.pageYOffset > 150 ? setShowScrollBttn(true) : setShowScrollBttn(false);
      };
      window.addEventListener('scroll', handleScrollBttnVisibility);
      return () => {
         window.addEventListener('scroll', handleScrollBttnVisibility);
      };
   });

   return (
      <div className={`scroll-to-top ${showScrollBttn ? 'active' : 'inactive'}`}>
         <button className={`scroll-button ${showScrollBttn ? 'active' : 'inactive'}`} onClick={handleScrollToTop}>
               <div className="text">Scroll To Top</div>
               <ArrowUpIcon size={25} />
         </button>
      </div>
   )
}
