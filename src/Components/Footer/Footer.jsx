import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#f3f4f6] text-gray-600 border-t shadow-inner mt-10 text-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-6 md:flex md:justify-between md:items-start">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
          {/* Resources */}
          <div>
            <h2 className="mb-2 font-semibold uppercase text-gray-900 text-xs">Resources</h2>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-orange-600 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-600 transition">About</Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h2 className="mb-2 font-semibold uppercase text-gray-900 text-xs">Follow Us</h2>
            <ul className="space-y-1">
              <li>
                <a href="https://github.com/singhshivamraj" target="_blank" rel="noreferrer" className="hover:text-orange-600 transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600 transition">Discord</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-2 font-semibold uppercase text-gray-900 text-xs">Legal</h2>
            <ul className="space-y-1">
              <li>
                <Link to="#" className="hover:text-orange-600 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-orange-600 transition">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-2" />

      <div className="max-w-screen-xl mx-auto px-4 pb-3 flex flex-col md:flex-row justify-between items-center gap-3">
        <span className="text-xs text-gray-500">
          © 2025 <a href="https://singhshivamraj.com/" className="hover:underline">Shivam Singh</a>. All Rights Reserved.
        </span>

        <div className="flex space-x-4 text-gray-500">
          <a href="#" className="hover:text-orange-600 transition" aria-label="Facebook">
            <i className="fab fa-facebook-f text-sm"></i>
          </a>
          <a href="#" className="hover:text-orange-600 transition" aria-label="Discord">
            <i className="fab fa-discord text-sm"></i>
          </a>
          <a href="#" className="hover:text-orange-600 transition" aria-label="Twitter">
            <i className="fab fa-twitter text-sm"></i>
          </a>
          <a href="#" className="hover:text-orange-600 transition" aria-label="GitHub">
            <i className="fab fa-github text-sm"></i>
          </a>
          <a href="#" className="hover:text-orange-600 transition" aria-label="Dribbble">
            <i className="fab fa-dribbble text-sm"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
