import React from 'react';

function header(){
    return(
        <header className="bg-white py-4 sm:py-2">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-2">
          <div className="logo">
            <a href="#" className="text-lg sm:text-sm font-semibold">My Site</a>
          </div>
          <nav>
            <ul className="flex space-x-4 sm:space-x-2">
              <li><a href="#" className="text-gray-800 hover:text-gray-600 text-base sm:text-xs">All</a></li>
              <li><a href="#" className="text-gray-800 hover:text-gray-600 text-base sm:text-xs">About</a></li>
              <li><a href="#" className="text-gray-800 hover:text-gray-600 text-base sm:text-xs">Projects</a></li>
              <li><a href="#" className="text-gray-800 hover:text-gray-600 text-base sm:text-xs">Blog</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
}
export default header; 