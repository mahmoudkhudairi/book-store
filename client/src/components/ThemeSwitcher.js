import { useState } from 'react';
import useTheme from '../hooks/useTheme';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
const ThemeSwitcher = ({ isPhone }) => {
  const [colorTheme, setTheme] = useTheme();
  const [darkTheme, setDarkTheme] = useState(colorTheme === 'dark' ? true : false);
  const toggleDarkMode = checked => {
    setTheme(colorTheme);
    setDarkTheme(checked);
  };
  if (isPhone) {
    return (
      <button
        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-catalina-blue-100 hover:opacity-75"
        onClick={() => toggleDarkMode(!darkTheme)}
      >
        change Theme
      </button>
    );
  } else {
    return (
      <DarkModeSwitch
        className="ml-2.5 md:mt-1 md:ml-0 "
        sunColor="white"
        checked={darkTheme}
        onChange={toggleDarkMode}
      />
    );
  }
};

export default ThemeSwitcher;
