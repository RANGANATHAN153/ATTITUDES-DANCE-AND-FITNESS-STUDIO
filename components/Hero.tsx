
import React from 'react';
import { attitudesLogoBase64 } from '../assets/logo';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-24 pb-12 bg-gray-900 flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <div className="w-full max-w-4xl mx-auto mb-8">
            <img 
                src={attitudesLogoBase64} 
                alt="Attitudes Studio Banner" 
                className="w-full h-auto rounded-lg shadow-2xl shadow-purple-500/20"
            />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-red-500">
            Unleash Your Attitude
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Welcome to Attitudes Fitness, Dance & Music Studio. We offer a dynamic range of classes for all ages and skill levels to help you find your rhythm and passion.
        </p>
         <a href="tel:7092717433" className="mt-8 inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300">
          Call to Join
        </a>
      </div>
    </section>
  );
};

export default Hero;
