"use client"
import React, { useState } from 'react';
import Link from 'next/link'; // If you're using Next.js
import { useRouter, usePathname } from 'next/navigation';
import { motion } from "framer-motion";

function Header() {
  const pathname = usePathname();
  const router = useRouter(); // Add this line to use useRouter
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Toggle the login state and button
  const toggleSwitch = () => {
    setIsLoggedIn(!isLoggedIn); 
    if (!isLoggedIn) {
      router.push('/login'); // Redirect to login page when switching on
    } else {
      router.push('/profile'); // Redirect to profile page when switching off
    }
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };


  const tabs = [
    { name: 'Home', href: '/' }, // Add the href for each tab
    { name: 'Task', href: '/task' },
    { name: 'Completed', href: '/completed' },
    { name: 'Members', href: '/members' },
  ];

  return (
    <header className="flex justify-center py-4 sm:py-2">
      <div className="bg-gray-200 p-2 rounded-full shadow my-16">
        <ul className="flex space-x-1 font-medium">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`px-4 py-2 rounded-full cursor-pointer hover:text-gray-300 ${
                pathname === tab.href ? 'bg-white' : 'text-gray-500'
              }`}
            >
              <Link href={tab.href}>
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* TODO: Hover on the switch button or text should trigger button change but not direct */}
      <div className="flex items-center space-x-2 p-10" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* setting the switch button */}
        <div
          className={`switch`}
          data-ison={isLoggedIn}
          onClick={toggleSwitch}
        >
          <motion.div className="handle" layout transition={spring} />
        </div>
        {/* click login or logout also trigger the switch button change */}
        <button
          onClick={toggleSwitch}
          className="relative flex items-center"
        >
          <div className={`absolute ${isLoggedIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            Logout
          </div>
          <div className={`absolute ${!isLoggedIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            Login
          </div>
        </button>
      </div>

    </header>
  );
}

export default Header;
