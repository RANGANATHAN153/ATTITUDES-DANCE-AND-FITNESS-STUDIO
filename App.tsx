import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="py-16 sm:py-24 space-y-20">
          <Categories />
          <Schedule />
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;