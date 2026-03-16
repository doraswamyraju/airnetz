import React from 'react';
import AssignedJobs from '../../components/agent/AssignedJobs';

const Tasks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Assignment</h1>
          <p className="text-gray-500 text-sm">Manage your daily service requests and tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase">8 Pending</span>
        </div>
      </div>
      <AssignedJobs />
    </div>
  );
};

export default Tasks;
