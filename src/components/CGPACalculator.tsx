import React, { useState, useEffect } from 'react';

interface Semester {
    id: string;
    name: string;
    gpa: string;
    credits: string;
}

export default function CGPACalculator() {
    const [semesters, setSemesters] = useState<Semester[]>([]);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('cgpa-data');
        if (saved) {
            try {
                setSemesters(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load CGPA data", e);
            }
        } else {
            // Initialize with 8 semesters by default as per user request
            const initialSemesters = Array.from({ length: 8 }).map((_, i) => ({
                id: i.toString(),
                name: `Semester ${i + 1}`,
                gpa: '',
                credits: ''
            }));
            setSemesters(initialSemesters);
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        if (semesters.length > 0) {
            localStorage.setItem('cgpa-data', JSON.stringify(semesters));
        }
    }, [semesters]);

    const handleChange = (id: string, field: keyof Semester, value: string) => {
        // Validate inputs
        if (field === 'gpa') {
            if (value === '') {
                // allow empty
            } else {
                const num = parseFloat(value);
                if (isNaN(num) || num < 0 || num > 4.0) return; // Basic validation
            }
        }
        if (field === 'credits') {
            if (value === '') {
                // allow empty
            } else {
                const num = parseFloat(value);
                if (isNaN(num) || num < 0 || num > 30) return; // Basic validation
            }
        }

        setSemesters(prev => prev.map(sem =>
            sem.id === id ? { ...sem, [field]: value } : sem
        ));
    };

    const cleanValues = semesters.map(s => ({
        gpa: parseFloat(s.gpa) || 0,
        credits: parseFloat(s.credits) || 0
    })).filter(s => s.credits > 0);

    const totalQualityPoints = cleanValues.reduce((sum, s) => sum + (s.gpa * s.credits), 0);
    const totalCredits = cleanValues.reduce((sum, s) => sum + s.credits, 0);
    const cgpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';

    const handleReset = () => {
        if (confirm('Reset all CGPA data?')) {
            const resetSemesters = Array.from({ length: 8 }).map((_, i) => ({
                id: i.toString(),
                name: `Semester ${i + 1}`,
                gpa: '',
                credits: ''
            }));
            setSemesters(resetSemesters);
            localStorage.removeItem('cgpa-data');
        }
    };

    return (
        <div className="card fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>Cumulative GPA (CGPA)</h2>
                <button onClick={handleReset} className="btn btn-danger" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
                    Reset
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                    <div>Semester</div>
                    <div>GPA</div>
                    <div>Credit Hours</div>
                </div>

                {semesters.map(sem => (
                    <div key={sem.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ fontWeight: '500' }}>{sem.name}</div>
                        <input
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            max="4.0"
                            value={sem.gpa}
                            onChange={(e) => handleChange(sem.id, 'gpa', e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.2)' }}
                        />
                        <input
                            type="number"
                            placeholder="Credits"
                            step="0.5"
                            value={sem.credits}
                            onChange={(e) => handleChange(sem.id, 'credits', e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.2)' }}
                        />
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem', border: '1px solid rgba(59, 130, 246, 0.2)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Quality Points: {totalQualityPoints.toFixed(2)} | Total Credits: {totalCredits}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    CGPA: {cgpa}
                </div>
            </div>
        </div>
    );
}
