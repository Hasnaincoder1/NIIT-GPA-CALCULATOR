export type Grade = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D';

export interface Subject {
    id: string;
    name: string;
    grade: Grade;
    credits: number;
}
