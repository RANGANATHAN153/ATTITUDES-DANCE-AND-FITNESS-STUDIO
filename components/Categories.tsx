
import React from 'react';
import type { Category } from '../types';
import { DanceIcon, AerobicsIcon, ViolinIcon, KidsDanceIcon, YogaIcon, MridangamIcon, BodyBuildingIcon } from './icons';

const categories: Category[] = [
  { name: 'Dance', icon: DanceIcon },
  { name: 'Aerobics', icon: AerobicsIcon },
  { name: 'Violin', icon: ViolinIcon },
  { name: "Kid's Dance", icon: KidsDanceIcon },
  { name: 'Yoga', icon: YogaIcon },
  { name: 'Mridangam', icon: MridangamIcon },
  { name: 'Body Building', icon: BodyBuildingIcon },
];

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  const Icon = category.icon;
  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-700 shadow-lg hover:shadow-purple-500/30 border border-gray-700">
      <div className="bg-gray-900 p-4 rounded-full mb-4">
        <Icon className="w-10 h-10 text-pink-400" />
      </div>
      <h3 className="text-xl font-bold text-white">{category.name}</h3>
    </div>
  );
};

const Categories: React.FC = () => {
  return (
    <section id="classes" className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold">Our Classes</h2>
        <p className="text-gray-400 mt-2">Find the perfect class to match your energy.</p>
        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
