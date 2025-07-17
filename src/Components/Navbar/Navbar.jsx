import React from 'react'
import {Link, NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-[#f5f5f5] shadow-md rounded-xl px-6 py-3 relative flex items-center justify-between">
  {/* Logo (left) */}
  <div className="flex items-center gap-3 z-10">
    <img src="./img/logo.png" alt="Logo" className="h-[60px] w-[60px] rounded-full border" />
  </div>

  {/* Title (center) */}
  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-bold text-gray-800">
    Create your own page
  </h1>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-lg font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-300 px-3 py-1 rounded-lg ${
                isActive
                  ? 'text-white bg-orange-600'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100'
              }`
            }
          >
            Home 
          </NavLink>
        </li>
        <li>
          <NavLink
            to="login"
            className={({ isActive }) =>
              `transition-colors duration-300 px-3 py-1 rounded-lg ${
                isActive
                  ? 'text-white bg-orange-600'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100'
              }`
            }
          >
            Login  
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/singup"
            className={({ isActive }) =>
              `transition-colors duration-300 px-3 py-1 rounded-lg ${
                isActive
                  ? 'text-white bg-orange-600'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100'
              }`
            }
          >
            Singup
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;