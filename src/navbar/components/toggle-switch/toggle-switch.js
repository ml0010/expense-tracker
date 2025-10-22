import { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/dark-mode-context';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import './toggle-switch.css';

const ToggleSwitch = () => {

   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

   return (
      <div className='toggle-switch'>
         <label className='label' htmlFor='toggle'>
            <div className={`toggle ${darkMode ? "dark-mode" : "light-mode"}`}>
                  <div className="icons">
                     <SunIcon size={24} />
                     <MoonIcon size={24} />
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
      </div>
   );
};

export default ToggleSwitch;