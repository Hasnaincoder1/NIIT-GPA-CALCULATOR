import React, { useState } from 'react';

interface Props {
    onConfirm: (count: number) => void;
}

export default function SubjectCountInput({ onConfirm }: Props) {
    const [count, setCount] = useState<number | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof count === 'number' && count > 0) {
            onConfirm(count);
        }
    };

    return (
        <div className="welcome-container fade-in" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
            <div className="card welcome-card">
                <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    Calculate Your Academic Success at NASTP
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                    Welcome to the official GPA Calculator for NIIT students.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>How many subjects would you like to calculate?</p>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            placeholder="e.g. 5"
                            value={count}
                            onChange={(e) => setCount(e.target.value ? parseInt(e.target.value) : '')}
                            style={{ fontSize: '1.25rem', textAlign: 'center' }}
                            autoFocus
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={!count || count <= 0}
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}
