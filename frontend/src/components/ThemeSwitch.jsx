// import React, { useState, useEffect } from 'react';
// import { Sun, Moon } from 'lucide-react';

// const ThemeSwitcher = () => {
//   const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     // Check if user has a saved theme preference
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setTheme(savedTheme);
//       document.documentElement.classList.toggle('dark', savedTheme === 'dark');
//     } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       // Use system preference as fallback
//       setTheme('dark');
//       document.documentElement.classList.add('dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
//       aria-label="Toggle theme"
//     >
//       {theme === 'light' ? (
//         <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
//       ) : (
//         <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
//       )}
//     </button>
//   );
// };

// export default ThemeSwitcher;

// import React from 'react';
// import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
// import { FaMoon, FaSun } from 'react-icons/fa';

// export const ColorModeSwitcher = props => {
//   const { toggleColorMode } = useColorMode();
//   const text = useColorModeValue('dark', 'light');
//   const SwitchIcon = useColorModeValue(FaMoon, FaSun);

//   return (
//     <IconButton
//       size="md"
//       top={'4'}
//       right={'4'}
//       position={"fixed"}
//       fontSize="lg"
//       aria-label={`Switch to ${text} mode`}
//       variant="ghost"
//       color="current"
//       marginLeft="2"
//       onClick={toggleColorMode}
//       icon={<SwitchIcon />}
//       {...props}
//     />
//   );
// };