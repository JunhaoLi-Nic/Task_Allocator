"use client"
import React, { useState } from 'react';

function header() {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = ['Home', 'Task', 'Completed', 'Members'];

  return (
    <header className="flex justify-center py-4 sm:py-2">
      <div className="bg-gray-200 p-2 rounded-full shadow my-16">
        <ul className="flex space-x-1 font-medium">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`px-4 py-2 rounded-full cursor-pointer hover:text-gray-300 ${activeTab === tab ? 'bg-white' : 'text-gray-500'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
export default header; 