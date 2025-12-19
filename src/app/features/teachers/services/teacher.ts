import { Injectable } from '@angular/core';

export type TeacherVm = {
  id: number;
  fullName: string;
  email?: string | null;
  phone?: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teachers: TeacherVm[] = [
    {
      id: 1,
      fullName: 'John Smith',
      email: 'john.smith@mail.com',
      phone: '2101234567',
    },
    {
      id: 2,
      fullName: 'Maria Papadopoulou',
      email: 'maria.p@mail.com',
      phone: null,
    },
  ];

  getAll(): TeacherVm[] {
    return [...this.teachers];
  }

  deleteById(id: number): void {
    this.teachers = this.teachers.filter(t => t.id !== id);
  }
}
