import React from 'react';
import { Subject } from '@/types';
import { GRADE_POINTS } from '@/utils/gpa';

interface Props {
    subjects: Subject[];
}

export default function GradeBreakdown({ subjects }: Props) {
    return (
        <div className="card fade-in" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Grade Breakdown</h3>

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            <th style={{ padding: '0.5rem' }}>Course</th>
                            <th style={{ padding: '0.5rem' }}>Grade</th>
                            <th style={{ padding: '0.5rem' }}>Points</th>
                            <th style={{ padding: '0.5rem' }}>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subject => (
                            <tr key={subject.id} style={{ borderBottom: '1px solid #334155' }}>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{subject.name || <i>Untitled</i>}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '0.25rem',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        fontWeight: 'bold'
                                    }}>
                                        {subject.grade}
                                    </span>
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{GRADE_POINTS[subject.grade]}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{subject.credits}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
