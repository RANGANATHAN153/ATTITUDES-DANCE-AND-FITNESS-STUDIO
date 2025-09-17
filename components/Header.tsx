
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Classes', id: 'classes' },
    { name: 'Schedule', id: 'schedule' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md fixed w-full z-50 top-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-white tracking-wider">
          <span className="text-pink-400">A</span>TTITUD<span className="text-purple-400">E</span>S
        </div>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
            >
              {link.name}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
