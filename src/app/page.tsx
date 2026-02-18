'use client';

import React, { useState, useEffect } from 'react';
import { Subject, Grade } from '@/types';
import { calculateGPA } from '@/utils/gpa';
import SubjectCountInput from '@/components/SubjectCountInput';
import SubjectRow from '@/components/SubjectRow';
import GPAResult from '@/components/GPAResult';
import GradeBreakdown from '@/components/GradeBreakdown';
import CGPACalculator from '@/components/CGPACalculator';

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [calculatorMode, setCalculatorMode] = useState<'gpa' | 'cgpa'>('gpa');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gpa-subjects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSubjects(parsed);
          setIsInitialized(true);
        }
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
    setLoading(false);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('gpa-subjects', JSON.stringify(subjects));
    }
  }, [subjects, isInitialized]);

  const handleInit = (count: number) => {
    const newSubjects: Subject[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now().toString() + i,
      name: `Course ${i + 1}`,
      grade: 'A',
      credits: 3
    }));
    setSubjects(newSubjects);
    setIsInitialized(true);
  };

  const handleChange = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(prev => prev.map(sub =>
      sub.id === id ? { ...sub, [field]: value } : sub
    ));
  };

  const handleRemove = (id: string) => {
    setSubjects(prev => prev.filter(sub => sub.id !== id));
  };

  const handleAddSubject = () => {
    setSubjects(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `Course ${prev.length + 1}`,
        grade: 'A',
        credits: 3
      }
    ]);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data?')) {
      setSubjects([]);
      setIsInitialized(false);
      localStorage.removeItem('gpa-subjects');
    }
  };

  if (loading) return null; // Or a spinner

  if (!isInitialized) {
    return (
      <main className="container">
        <SubjectCountInput onConfirm={handleInit} />
      </main>
    );
  }

  const { gpa, totalCredits } = calculateGPA(subjects);

  return (
    <main className="container fade-in">
      <header style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '3rem',
        textAlign: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(15, 23, 42, 0) 100%)',
        borderRadius: '1rem',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #60a5fa, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          NASTP Institute of Information Technology
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>GPA Calculator</p>

        <button onClick={handleReset} className="btn btn-danger" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', marginTop: '1.5rem' }}>
          Reset All Data
        </button>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--card-bg)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border)', display: 'inline-flex' }}>
          <button
            onClick={() => setCalculatorMode('gpa')}
            className="btn"
            style={{
              background: calculatorMode === 'gpa' ? 'var(--primary)' : 'transparent',
              color: calculatorMode === 'gpa' ? 'white' : 'var(--text-muted)',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem'
            }}
          >
            Semester GPA
          </button>
          <button
            onClick={() => setCalculatorMode('cgpa')}
            className="btn"
            style={{
              background: calculatorMode === 'cgpa' ? 'var(--primary)' : 'transparent',
              color: calculatorMode === 'cgpa' ? 'white' : 'var(--text-muted)',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem'
            }}
          >
            Calculate CGPA
          </button>
        </div>
      </div>

      {calculatorMode === 'gpa' ? (
        <>
          <section>
            {subjects.map(subject => (
              <SubjectRow
                key={subject.id}
                subject={subject}
                onChange={handleChange}
                onRemove={handleRemove}
              />
            ))}

            <button
              onClick={handleAddSubject}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', background: 'var(--card-bg)', border: '2px dashed var(--border)', color: 'var(--primary)' }}
            >
              + Add another course
            </button>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
            <GPAResult gpa={gpa} totalCredits={totalCredits} />
            <GradeBreakdown subjects={subjects} />
          </section>
        </>
      ) : (
        <CGPACalculator />
      )}
    </main>
  );
}
