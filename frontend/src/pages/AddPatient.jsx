import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {Loader2, AlertCircle} from 'lucide-react';
import FormInput from "../components/FormInput.jsx";
import FormSelect from "../components/FormSelect.jsx";
import Toast from "../components/Toast.jsx";
import {API_BASE_URL} from "../config/api.js";

export default function AddPatient() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    // Initialize React Hook Form
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            patientId: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: ''
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/fhir/patients`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            const resData = await response.json();

            if (!response.ok) throw new Error(resData.message || 'Failed to add patient');

            setToast({message: resData.message || 'Patient added successfully!', type: 'success'});
            navigate('/');

        } catch (error) {
            console.error('Error adding patient:', error);
            setToast({message: error.message || 'Failed to add patient. Please try again.', type: 'error'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>}
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Patient</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <FormInput
                                label="Patient ID"
                                placeholder="e.g., P-102"
                                {...register("patientId", {required: "Patient ID is required"})}
                            />
                            {errors.patientId && (
                                <div className="flex items-center gap-1 mt-1.5">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0"/>
                                    <p className="text-red-600 text-sm font-medium">{errors.patientId.message}</p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <FormInput
                                    label="First Name"
                                    placeholder="Enter first name"
                                    {...register("firstName", {required: "First name is required"})}
                                />
                                {errors.firstName && (
                                    <div className="flex items-center gap-1 mt-1.5">
                                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0"/>
                                        <p className="text-red-600 text-sm font-medium">{errors.firstName.message}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <FormInput
                                    label="Last Name"
                                    placeholder="Enter last name"
                                    {...register("lastName", {required: "Last name is required"})}
                                />
                                {errors.lastName && (
                                    <div className="flex items-center gap-1 mt-1.5">
                                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0"/>
                                        <p className="text-red-600 text-sm font-medium">{errors.lastName.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <FormInput
                                label="Birth Date"
                                type="date"
                                {...register("birthDate", {required: "Birth date is required"})}
                            />
                            {errors.birthDate && (
                                <div className="flex items-center gap-1 mt-1.5">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0"/>
                                    <p className="text-red-600 text-sm font-medium">{errors.birthDate.message}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <FormSelect
                                label="Gender"
                                options={[
                                    {value: '', label: 'Select Gender'},
                                    {value: 'Male', label: 'Male'},
                                    {value: 'Female', label: 'Female'},
                                    {value: 'Other', label: 'Other'}
                                ]}
                                {...register("gender", {required: "Gender is required"})}
                            />
                            {errors.gender && (
                                <div className="flex items-center gap-1 mt-1.5">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0"/>
                                    <p className="text-red-600 text-sm font-medium">{errors.gender.message}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                disabled={loading}
                                className="flex-1 px-6 py-3 border border-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={20}/>
                                        Adding Patient...
                                    </>
                                ) : (
                                    'Add Patient'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}