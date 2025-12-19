import { Injectable } from '@angular/core';

export type CourseVm = {
  id: number;
  title: string;
  credits: number;
  startDate: string;
  endDate: string;
  teacherId?: number | null;
};

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: CourseVm[] = [
    {
      id: 1,
      title: 'Intro to C#',
      credits: 5,
      startDate: '2025-10-01',
      endDate: '2025-12-15',
      teacherId: 2,
    },
    {
      id: 2,
      title: 'Databases (SQL Server)',
      credits: 6,
      startDate: '2025-10-10',
      endDate: '2026-01-20',
      teacherId: null,
    },
  ];

  getAll(): CourseVm[] {
    return [...this.courses];
  }

  deleteById(id: number): void {
    this.courses = this.courses.filter(c => c.id !== id);
  }
}
