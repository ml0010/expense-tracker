import { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/dark-mode-context';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import './toggle-switch.css';
import { MenuToggleContext } from '../../../contexts/menu-toggle-context';

const ToggleSwitch = () => {

   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
   const { showMenu } = useContext(MenuToggleContext);
   

   return (
      <div className='toggle-switch'>
         {showMenu ? 
         <label className='label' htmlFor='toggle'>
            <div className={`toggle ${darkMode ? "dark-mode" : "light-mode"}`}>
                  <div className="icons">
                     <MoonIcon size={20} />
                     <SunIcon size={20} />
                  </div>
                  <input
                     id="toggle"
                     name="toggle"
                     type="checkbox"
                     checked={darkMode}
                     onChange={toggleDarkMode}
                  />
               </div>
         </label>
         :
         <label className='label' htmlFor='toggle'>
            <div className={`toggle-minimal ${darkMode ? "dark-mode" : "light-mode"}`}>
                  <div className="icons">
                     {darkMode ? <MoonIcon size={20} /> : <SunIcon size={20} />} 
                  </div>
                  <input
                     id="toggle"
                     name="toggle"
                     type="checkbox"
                     checked={darkMode}
                     onChange={toggleDarkMode}
                  />
               </div>
         </label>
         }

      </div>
   );
};

export default ToggleSwitch;