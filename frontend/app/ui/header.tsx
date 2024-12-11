"use client"
import React, { useState } from 'react';
import Link from 'next/link'; // If you're using Next.js
import { usePathname } from 'next/navigation';
import UserModal from '../modal/userModal';

function Header() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const tabs = [
    { name: 'Home', href: '/' },
    { name: 'Tasks', href: '/task' },
    { name: 'Bills', href: '/bill' },
    { name: 'Members', href: '/members' },
  ];

  return (
    <div className="flex items-center justify-between w-full px-10 py-4 pt-20">
      <div className="flex-1 flex justify-center">
        <button>
          +
        </button>
      </div> 
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-200 p-2 rounded-full shadow">
          <ul className="flex space-x-4 font-medium">
            {tabs.map((tab) => (
              <li key={tab.name} className={`px-4 py-2 rounded-full cursor-pointer hover:text-gray-300 ${pathname === tab.href ? 'bg-white' : 'text-gray-500'}`}>
                <Link href={tab.href}>{tab.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 flex justify-center mx-3">
        <button onClick={openModal} className="bg-gray-200 p-2 rounded shadow text-lg font-semibold">
          Login
        </button>
        <UserModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}

export default Header;