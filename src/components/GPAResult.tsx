import React from 'react';

interface Props {
    gpa: string;
    totalCredits: number;
}

export default function GPAResult({ gpa, totalCredits }: Props) {
    const gpaNum = parseFloat(gpa);
    const percentage = (gpaNum / 4.0) * 100;

    let color = 'var(--danger)';
    if (gpaNum >= 3.5) color = 'var(--success)';
    else if (gpaNum >= 3.0) color = '#fbbf24';
    else if (gpaNum >= 2.0) color = '#f97316';

    return (
        <div className="card fade-in" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>Cumulative GPA</h3>

            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: color, margin: '0.5rem 0' }}>
                {gpa}
            </div>

            <div style={{ background: '#334155', height: '10px', borderRadius: '5px', overflow: 'hidden', margin: '0 auto 1.5rem', maxWidth: '300px' }}>
                <div
                    style={{
                        width: `${percentage}%`,
                        background: color,
                        height: '100%',
                        transition: 'width 1s ease-out'
                    }}
                />
            </div>

            <p style={{ color: 'var(--text-muted)' }}>
                Total Credit Hours: <span style={{ color: 'var(--foreground)', fontWeight: 'bold' }}>{totalCredits}</span>
            </p>
        </div>
    );
}
