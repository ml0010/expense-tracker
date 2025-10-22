import { useLocation, useNavigate } from "react-router-dom"
import "./back-button.css";
import { useEffect, useState } from "react";
import { CaretCircleDoubleLeftIcon } from "@phosphor-icons/react";

export const BackButton = () => {

   const location = useLocation();

   const [ isPreviousPage, setIsPreviousPage ] = useState(false);

   useEffect(() => {
      if (location.pathname !== "/")
         setIsPreviousPage(true);
   }, [location]);

   const navigate = useNavigate();
   
   return (
      <div className='go-back'>
         {isPreviousPage && 
               <>
                  <p className="text">Go Back</p>
                  <button className="back-button" onClick={() => navigate(-1)}><CaretCircleDoubleLeftIcon size={50} weight="fill" /></button>
               </>
         }
      </div>
   )
}
