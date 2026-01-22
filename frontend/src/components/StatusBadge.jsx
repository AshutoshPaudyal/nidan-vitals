import React from 'react';

export default function StatusBadge({ label, color }) {
  const colors = {
    red: 'bg-red-100 text-red-800 border-red-300',
    orange: 'bg-orange-100 text-orange-800 border-orange-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    gray: 'bg-gray-100 text-gray-800 border-gray-300'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[color]}`}>
      {label}
    </span>
  );
}