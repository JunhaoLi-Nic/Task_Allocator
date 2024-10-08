"use client"
import React, { useState } from 'react';
import Link from 'next/link'; // If you're using Next.js
import {usePathname} from 'next/navigation'; 
import UserModal from '../modal/userModal';

function Header() {
 // const [activeTab, setActiveTab] = useState('Home');
  const pathname = usePathname(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


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
              className={`px-4 py-2 rounded-full cursor-pointer hover:text-gray-300 ${pathname === tab.href ? 'bg-white' : 'text-gray-500'
                }`}
            >
              <Link href={tab.href}>
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User modal: login, register and forgot password pop up window */}
      <div className="flex justify-center py-2 px-4">
        <button onClick={openModal} className="bg-gray-200 p-2 rounded shadow my-16 text-l font-semibold">
          Login
        </button>
        <UserModal isOpen={isModalOpen} onClose={closeModal} />
      </div>


    </header>
  );
}

export default Header;