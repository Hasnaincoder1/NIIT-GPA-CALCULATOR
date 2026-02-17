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
        <div className="card fade-in" style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Let's get started</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                How many subjects or courses would you like to calculate?
            </p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
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
    );
}
