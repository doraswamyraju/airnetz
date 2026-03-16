import React from 'react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const AssignedJobs: React.FC = () => {
  const jobs = [
    { time: '10:30 AM', task: 'Fiber Connection Installation', location: 'MR Palli, Tirupati', status: 'In Progress' },
    { time: '01:00 PM', task: 'Router Replacement', location: 'KT Road', status: 'Pending' },
    { time: '03:30 PM', task: 'Network Troubleshooting', location: 'Alipiri Road', status: 'Pending' },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3>
        <button className="text-sm font-bold text-primary-600">View Map</button>
      </div>
      <div className="divide-y divide-gray-50">
        {jobs.map((job, i) => (
          <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-gray-900">{job.time}</span>
                <div className="w-px h-8 bg-gray-200 my-1"></div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{job.task}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MapPin size={14} /> {job.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                job.status === 'In Progress' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {job.status}
              </span>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedJobs;
