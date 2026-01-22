import React from 'react';

export default function ActionCard({ icon: Icon, title, bgColor, hoverColor, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`${bgColor} ${hoverColor} text-white p-6 rounded-lg shadow-sm flex items-center justify-center gap-3 transition-colors cursor-pointer hover:${hoverColor} hover:text-white`}
        >
            <Icon size={24} />
            <span className="text-lg font-semibold">{title}</span>
        </button>
    );
}