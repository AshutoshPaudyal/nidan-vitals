export const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

export const getBMIStatus = (bmi) => {
    if (!bmi) return { label: '-', color: 'gray' };
    if (bmi < 18.5) return { label: 'Underweight', color: 'blue' };
    if (bmi < 25) return { label: 'Normal', color: 'green' };
    if (bmi < 30) return { label: 'Overweight', color: 'orange' };
    return { label: 'Obese', color: 'red' };
};

export const getBPStatus = (systolic, diastolic) => {
    if (!systolic || !diastolic) return { label: '-', color: 'gray' };
    if (systolic >= 140 || diastolic >= 90) return { label: 'Hypertension', color: 'red' };
    return { label: 'Normal', color: 'green' };
};