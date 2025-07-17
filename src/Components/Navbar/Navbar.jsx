

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f5f5f5] shadow-md rounded-xl px-6 py-3 flex items-center justify-between relative">
      {/* Logo (left) */}
      <div className="flex items-center gap-3 z-10">
        <img
          src="./img/logo.png"
          alt="Logo"
          className="h-[50px] w-[50px] rounded-full border"
        />
      </div>

      {/* Title (center) */}
      <h1 className="hidden md:block text-2xl md:text-3xl font-bold text-gray-800">
        Create your own page
      </h1>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex gap-6 text-lg font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-300 px-3 py-1 rounded-lg ${
                isActive
                  ? "text-white bg-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-100"
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
                  ? "text-white bg-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-100"
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
                  ? "text-white bg-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-100"
              }`
            }
          >
            Signup
          </NavLink>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-gray-700 z-20"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-[#f5f5f5] shadow-md flex flex-col items-center gap-4 py-4 text-lg font-medium md:hidden z-10">
          <li>
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-center transition-colors duration-300 px-3 py-1 rounded-lg ${
                  isActive
                    ? "text-white bg-orange-600"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-100"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="login"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-center transition-colors duration-300 px-3 py-1 rounded-lg ${
                  isActive
                    ? "text-white bg-orange-600"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-100"
                }`
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/singup"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-center transition-colors duration-300 px-3 py-1 rounded-lg ${
                  isActive
                    ? "text-white bg-orange-600"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-100"
                }`
              }
            >
              Signup
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
