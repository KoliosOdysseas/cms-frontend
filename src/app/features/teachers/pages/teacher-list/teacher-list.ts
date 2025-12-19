import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeacherService, TeacherVm } from '../../services/teacher';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.scss',
})
export class TeacherList {
  teachers: TeacherVm[] = [];

  constructor(private teacherService: TeacherService) {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teachers = this.teacherService.getAll();
  }

  onDelete(teacherId: number) {
    const ok = confirm(`Delete teacher with id ${teacherId}?`);
    if (!ok) return;

    this.teacherService.deleteById(teacherId);
    this.loadTeachers();
  }
}
