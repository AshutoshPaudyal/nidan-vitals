import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function VitalsDisplay({ type, value, status }) {
    const isAlert = status.color === 'red' || status.color === 'orange';

    return (
        <div className={`p-4 rounded-lg border-2 ${
            status.color === 'red' ? 'bg-red-50 border-red-300' :
                status.color === 'orange' ? 'bg-orange-50 border-orange-300' :
                    status.color === 'green' ? 'bg-green-50 border-green-300' :
                        'bg-blue-50 border-blue-300'
        }`}>
            <div className="flex items-center gap-2 mb-2">
                {isAlert ? (
                    <AlertTriangle size={20} className={`text-${status.color}-600`} />
                ) : (
                    <CheckCircle size={20} className={`text-${status.color}-600`} />
                )}
                <span className="font-semibold text-gray-900">
          {type === 'BMI' ? 'BMI Calculation' : 'Blood Pressure'}
        </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
                {type === 'BMI' ? `BMI: ${value}` : value}
            </p>
            <p className={`text-sm font-medium text-${status.color}-700 mt-1`}>
                {type === 'BMI' ? `Category: ${status.label}` : `Status: ${status.label}`}
            </p>
        </div>
    );
}