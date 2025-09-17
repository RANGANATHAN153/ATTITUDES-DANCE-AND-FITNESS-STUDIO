
import React from 'react';
import type { ScheduleItem } from '../types';

const generalSchedule: ScheduleItem[] = [
  { time: '6am to 7am', title: "Morning Aerobics & Yoga", description: 'Start your day with energy.', color: 'from-blue-500 to-cyan-400' },
  { time: '10:30am to 11:30am', title: "Ladies' Aerobics", description: 'A dedicated session for women.', color: 'from-pink-500 to-rose-400' },
  { time: '7pm to 8pm', title: "Evening Aerobics", description: 'For ladies and kids.', color: 'from-purple-500 to-indigo-400' },
  { time: '8pm to 9:30pm', title: "Adults' Dance Class", description: 'Learn new moves.', color: 'from-orange-500 to-amber-400' },
];

const kidsSchedule: ScheduleItem[] = [
  { time: '6pm to 7pm', title: "Saturday Kids' Dance", description: 'Weekend fun and dance.', color: 'from-teal-500 to-emerald-400' },
  { time: '5pm to 6pm', title: "Sunday Kids' Dance", description: 'Continue the weekend groove.', color: 'from-lime-500 to-green-400' },
];

const ScheduleCard: React.FC<{ item: ScheduleItem }> = ({ item }) => (
    <div className={`bg-gray-800 p-6 rounded-lg border-l-4 border-pink-500 shadow-lg transform transition-transform hover:scale-105 hover:-translate-y-1`}>
        <div className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color} mb-1`}>{item.time}</div>
        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
        <p className="text-gray-400">{item.description}</p>
    </div>
);

const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold">Class Schedule</h2>
        <p className="text-gray-400 mt-2">Our studio is open from 6am to 9:30pm. Find your slot!</p>
        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded"></div>
      </div>
      
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Main Classes</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generalSchedule.map(item => <ScheduleCard key={item.title} item={item} />)}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Kid's Dance Timings</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {kidsSchedule.map(item => <ScheduleCard key={item.title} item={item} />)}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
