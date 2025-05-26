import React from 'react';

const members = [
  {
    name: 'Sarah Khan',
    role: 'Owner',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Ali Raza',
    role: 'Editor',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Ayesha Malik',
    role: 'Contributor',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const MembersList = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
        <span className="text-sm text-[#858585] cursor-pointer hover:underline">
          See All
        </span>
      </div>

      {/* Members */}
      <div className="space-y-4">
        {members.map((member, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-900 font-medium">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
