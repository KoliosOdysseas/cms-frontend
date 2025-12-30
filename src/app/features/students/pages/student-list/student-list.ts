import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student';
import { StudentReadDto } from '../../../../core/models/student.models';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList {
  private studentService = inject(StudentService);

  students: StudentReadDto[] = [];
  loading = false;
  error: string | null = null;

  deletingId: number | null = null;

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.error = null;

    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Failed to load students.';
      },
    });
  }

  isDeleting(id: number): boolean {
    return this.deletingId === id;
  }

  deleteStudent(s: StudentReadDto): void {
    if (this.deletingId !== null) return;

    const ok = confirm(`Delete "${s.fullName}"?`);
    if (!ok) return;

    this.error = null;
    this.deletingId = s.id;

    this.studentService.delete(s.id).subscribe({
      next: () => {
        this.deletingId = null;
        this.error = null;
        this.loadStudents();
      },
      error: (err) => {
        this.deletingId = null;

        const status = err?.status;
        if (status === 409) this.error = 'Cannot delete student (has related records).';
        else if (status === 401 || status === 403) this.error = 'Not authorized.';
        else this.error = err?.error?.message ?? 'Delete failed.';
      },
    });
  }
}
