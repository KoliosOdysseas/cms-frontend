import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EnrollmentService } from '../../../enrollments/services/enrollment';
import { StudentService } from '../../../students/services/student';

import { StudentReadDto } from '../../../../core/models/student.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-enrollments',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './course-enrollments.html',
  styleUrl: './course-enrollments.scss',
})
export class CourseEnrollments {
  private route = inject(ActivatedRoute);
  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);

  courseId = 0;
  courseTitle = ''; // απλό placeholder

  allStudents: StudentReadDto[] = [];
  enrolledStudents: StudentReadDto[] = [];

  selectedStudentId: number | null = null;

  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseTitle = `Course #${this.courseId}`;
    this.loadAll();
  }

  get availableStudents(): StudentReadDto[] {
    const enrolledIds = new Set(this.enrolledStudents.map(s => s.id));
    return this.allStudents.filter(s => !enrolledIds.has(s.id));
  }

  loadAll(): void {
    this.loading = true;
    this.error = null;

    // 1) all students (for dropdown)
    this.studentService.getAll().subscribe({
      next: (students: StudentReadDto[]) => {
        this.allStudents = students;

        // 2) enrolled students
        this.enrollmentService.getStudentsByCourse(this.courseId).subscribe({
          next: (enrolled: StudentReadDto[]) => {
            this.enrolledStudents = enrolled;
            this.loading = false;

            const first = this.availableStudents[0];
            this.selectedStudentId = first ? first.id : null;
          },
          error: (err: HttpErrorResponse) => {
            this.loading = false;
            this.error = err?.error?.message ?? 'Failed to load enrollments.';
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Failed to load students.';
      },
    });
  }

  enroll(): void {
    if (!this.selectedStudentId) return;

    this.error = null;

    this.enrollmentService.enroll({
      studentId: this.selectedStudentId,
      courseId: this.courseId,
    }).subscribe({
      next: () => this.refreshEnrolled(),
      error: (err: HttpErrorResponse) => {
        const status = err?.status;
        if (status === 409) this.error = 'Student is already enrolled.';
        else if (status === 401 || status === 403) this.error = 'Not authorized.';
        else this.error = err?.error?.message ?? 'Enroll failed.';
      },
    });
  }

  unenroll(studentId: number): void {
    const ok = confirm('Remove this student from the course?');
    if (!ok) return;

    this.error = null;

    this.enrollmentService.unenroll(studentId, this.courseId).subscribe({
      next: () => this.refreshEnrolled(),
      error: (err: HttpErrorResponse) => {
        const status = err?.status;
        if (status === 401 || status === 403) this.error = 'Not authorized.';
        else this.error = err?.error?.message ?? 'Remove failed.';
      },
    });
  }

  private refreshEnrolled(): void {
    this.enrollmentService.getStudentsByCourse(this.courseId).subscribe({
      next: (enrolled: StudentReadDto[]) => {
        this.enrolledStudents = enrolled;

        const available = this.availableStudents;
        if (!available.some(s => s.id === this.selectedStudentId)) {
          this.selectedStudentId = available[0]?.id ?? null;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error = err?.error?.message ?? 'Failed to refresh enrollments.';
      },
    });
  }
}
