import React from 'react';
import { Grade, Subject } from '@/types';
import { GRADE_POINTS } from '@/utils/gpa';

interface Props {
    subject: Subject;
    onChange: (id: string, field: keyof Subject, value: string | number) => void;
    onRemove: (id: string) => void;
}

const GRADES = Object.keys(GRADE_POINTS) as Grade[];

export default function SubjectRow({ subject, onChange, onRemove }: Props) {

    const getGradeColor = (g: Grade) => {
        if (g === 'A' || g === 'A-') return 'var(--success)';
        if (g.startsWith('B')) return '#fbbf24'; // Amber-400
        if (g.startsWith('C')) return '#f97316'; // Orange-500
        if (g.startsWith('D')) return '#facc15'; // Yellow-400
        return 'var(--danger)';
    };

    return (
        <div className="card fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Course Name</label>
                <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => onChange(subject.id, 'name', e.target.value)}
                    placeholder="e.g. Mathematics"
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Grade</label>
                <select
                    value={subject.grade}
                    onChange={(e) => onChange(subject.id, 'grade', e.target.value as Grade)}
                    style={{ borderLeft: `4px solid ${getGradeColor(subject.grade)}` }}
                >
                    {GRADES.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Credits</label>
                <select
                    value={subject.credits}
                    onChange={(e) => onChange(subject.id, 'credits', parseInt(e.target.value) || 0)}
                    style={{ borderLeft: '4px solid var(--primary)' }}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            <div style={{ paddingTop: '1.25rem' }}>
                <button
                    onClick={() => onRemove(subject.id)}
                    className="btn btn-danger btn-icon"
                    title="Remove course"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
