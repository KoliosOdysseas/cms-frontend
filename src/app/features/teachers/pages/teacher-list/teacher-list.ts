import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type TeacherVm = {
  id: number;
  fullName: string;
  email?: string | null;
  phone?: string | null;
};

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.scss',
})
export class TeacherList {
  teachers: TeacherVm[] = [
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

  onDelete(teacherId: number) {
    const ok = confirm(`Delete teacher with id ${teacherId}?`);
    if (!ok) return;

    this.teachers = this.teachers.filter(t => t.id !== teacherId);
  }
}
