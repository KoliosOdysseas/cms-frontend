import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CourseApiService } from '../../../../core/services/course-api.service';
import { Course } from '../../../../core/models/course.models';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList {
  courses: Course[] = [];
  loading = false;
  error = '';

  constructor(private courseApi: CourseApiService) {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.error = '';

    this.courseApi.getAll().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: () => {
        this.error = 'Αποτυχία φόρτωσης μαθημάτων.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onDelete(courseId: number): void {
    const ok = confirm(`Delete course with id ${courseId}?`);
    if (!ok) return;

    this.courseApi.delete(courseId).subscribe({
      next: () => {
        // refresh list after successful delete
        this.loadCourses();
      },
      error: () => {
        this.error = 'Αποτυχία διαγραφής.';
      },
    });
  }
}
