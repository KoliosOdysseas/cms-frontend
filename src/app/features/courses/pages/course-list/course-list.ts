import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService, CourseVm } from '../../services/course';




@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList {
  courses: CourseVm[] = [
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

  onDelete(courseId: number) {
    // placeholder: αργότερα θα καλεί API
    const ok = confirm(`Delete course with id ${courseId}?`);
    if (!ok) return;

    this.courses = this.courses.filter(c => c.id !== courseId);
  }
}
