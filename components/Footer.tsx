
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12 text-center text-gray-400">
        <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
        <p className="mb-6">Ready to join a class? Give us a call!</p>
        <a href="tel:7092717433" className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 transition-all duration-300">
          7092717433
        </a>
        <div className="mt-10 border-t border-gray-700 pt-8">
            <p>&copy; {new Date().getFullYear()} Attitudes Fitness & Dance Studio. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
