import { useState } from 'react';
import useTheme from '../hooks/useTheme';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
const ThemeSwitcher = () => {
  const [colorTheme, setTheme] = useTheme();
  const [darkTheme, setDarkTheme] = useState(colorTheme === 'dark' ? true : false);
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkTheme(checked);
  };
  return (
    <DarkModeSwitch
      className="ml-2.5 md:mt-1 md:ml-0 "
      sunColor="white"
      checked={darkTheme}
      onChange={toggleDarkMode}
    />
  );
};

export default ThemeSwitcher;
