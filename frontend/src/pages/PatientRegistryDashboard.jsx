import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Search, UserPlus, Activity, AlertCircle, ChevronLeft, ChevronRight} from 'lucide-react';
import StatusBadge from "../components/StatusBadge.jsx";
import ActionCard from "../components/ActionCard.jsx";
import {format} from "date-fns";
import {API_BASE_URL} from "../config/api.js";


export default function PatientRegistryDashboard() {
    const navigate = useNavigate();
    const [vitals, setVitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);


    useEffect(() => {
        fetchVitals();
    }, [searchQuery, filterStatus, currentPage]);

    const fetchVitals = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();
            if (searchQuery.trim()) params.append('patientId', searchQuery.trim());
            if (filterStatus !== 'All') params.append('status', filterStatus);
            params.append('page', currentPage);
            params.append('size', pageSize);

            const response = await fetch(`${API_BASE_URL}/api/fhir/observation?${params.toString()}`);

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            setVitals(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            console.error('Error fetching vitals:', error);
        } finally {
            setLoading(false);
        }
    };

    const getBMIColor = (bmiStatus) => {
        if (!bmiStatus) return 'gray';
        const statusLower = bmiStatus.toLowerCase();
        if (statusLower.includes('obese')) return 'red';
        if (statusLower.includes('overweight')) return 'orange';
        if (statusLower.includes('normal')) return 'green';
        if (statusLower.includes('underweight')) return 'blue';
        return 'gray';
    };

    const getBPColor = (bpStatus) => {
        if (!bpStatus) return 'gray';
        const statusLower = bpStatus.toLowerCase();
        if (statusLower.includes('hypertension')) return 'red';
        if (statusLower.includes('elevated')) return 'orange';
        return 'green';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Vitals Registry</h1>
                    <p className="text-gray-600">Clinical Decision Support Dashboard</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <ActionCard
                        icon={UserPlus}
                        title="Add New Patient"
                        bgColor="bg-blue-600"
                        hoverColor="hover:bg-blue-700"
                        onClick={() => navigate('/add-patient')}
                    />
                    <ActionCard
                        icon={Activity}
                        title="Add Vitals Record"
                        bgColor="bg-green-600"
                        hoverColor="hover:bg-green-700"
                        onClick={() => navigate('/add-vitals')}
                    />
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
                            <input
                                type="text"
                                placeholder="Search by Patient ID..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(0);
                                }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {['All', 'Underweight', 'Normal', 'Overweight', 'Obese'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        setFilterStatus(status);
                                        setCurrentPage(0);
                                    }}
                                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
                                        filterStatus === status
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Patient Registry Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="text-center py-12">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading patient vitals...</p>
                        </div>
                    ) : vitals.length === 0 ? (
                        <div className="text-center py-12">
                            <AlertCircle className="mx-auto text-gray-400 mb-3" size={48}/>
                            <p className="text-gray-600 text-lg">No patient found</p>
                            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                            Patient ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                            BMI
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                            BMI Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                            Blood Pressure
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                            Blood Pressure Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                            Recorded At
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {vitals.map((vital, index) => {
                                        const bpColor = getBPColor(vital.bloodPressureStatus);
                                        const bmiColor = getBMIColor(vital.bmiStatus);

                                        return (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                                                    {vital.patientId}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">
                                                    {vital.bmi?.toFixed(1)} kg/m<sup>2</sup>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge label={vital.bmiStatus || 'N/A'} color={bmiColor}/>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">
                                                    {vital.systolicBP}/{vital.diastolicBP} mmHg
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge label={vital.bloodPressureStatus || 'N/A'}
                                                                 color={bpColor}/>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">
                                                    {format(new Date(vital.recordedAt), "yyyy-MM-dd HH:mm:ss")}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Page {currentPage + 1} of {totalPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                            disabled={currentPage === 0}
                                            className={`px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer ${
                                                currentPage === 0
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                        >
                                            <ChevronLeft size={16}/>
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                            disabled={currentPage === totalPages - 1}
                                            className={`px-3 py-1 rounded-lg flex items-center cursor-pointer gap-1 ${
                                                currentPage === totalPages - 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                        >
                                            Next
                                            <ChevronRight size={16}/>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}