import { Grade, Subject } from '@/types';

export const GRADE_POINTS: Record<Grade, number> = {
    'A': 4.0,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.0,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.0,
    'C-': 1.67,
    'D': 1.0,
    'F': 0.0,
    'XF': 0.0,
};

export const calculateGPA = (subjects: Subject[]) => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
        const points = GRADE_POINTS[subject.grade];
        totalPoints += points * subject.credits;
        totalCredits += subject.credits;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

    return {
        gpa,
        totalCredits,
        totalPoints
    };
};
