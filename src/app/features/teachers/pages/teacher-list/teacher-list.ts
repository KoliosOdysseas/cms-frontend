import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TeacherService } from '../../services/teacher';
import { TeacherReadDto } from '../../../../core/models/teacher.models';
import { TeacherInfo } from '../../../../core/models/teacher-info.model';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.scss',
})
export class TeacherList {
  private teacherService = inject(TeacherService);

  teachers: TeacherReadDto[] = [];
  loading = false;

  error: string | null = null;

  // keeps track of currently deleting teacher
  deletingId: number | null = null;

  // INFO (read-only details)
  expandedTeacherId: number | null = null;
  infoLoadingId: number | null = null;
  infoCache = new Map<number, TeacherInfo>();
  infoError = new Map<number, string>();

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.loading = true;
    this.error = null;

    this.teacherService.getAll().subscribe({
      next: (data) => {
        this.teachers = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        // don't expose raw error
        this.error = err?.error?.message ?? 'Failed to load teachers.';
      },
    });
  }

  deleteTeacher(t: TeacherReadDto): void {
    // blocking delete
    if (this.deletingId !== null) return;

    const ok = confirm(`Delete "${t.fullName}"?`);
    if (!ok) return;

    this.error = null;
    this.deletingId = t.id;

    this.teacherService.delete(t.id).subscribe({
      next: () => {
        // success: clear banner + refresh list
        this.deletingId = null;
        this.error = null;
        this.loadTeachers();
      },
      error: (err) => {
        this.deletingId = null;

        const status = err?.status;
        if (status === 409) this.error = 'Cannot delete teacher (has related records).';
        else if (status === 401 || status === 403) this.error = 'Not authorized.';
        else this.error = err?.error?.message ?? 'Delete failed.';
      },
    });
  }

  // helper για template
  isDeleting(id: number): boolean {
    return this.deletingId === id;
  }

  // -------- INFO --------

  toggleInfo(id: number): void {
    // collapse if already open
    if (this.expandedTeacherId === id) {
      this.expandedTeacherId = null;
      return;
    }

    this.expandedTeacherId = id;

    // use cache
    if (this.infoCache.has(id)) return;

    this.infoLoadingId = id;
    this.infoError.delete(id);

    this.teacherService.getInfo(id).subscribe({
      next: (data) => {
        this.infoCache.set(id, data);
        this.infoLoadingId = null;
      },
      error: (err) => {
        this.infoLoadingId = null;

        const status = err?.status;
        if (status === 401 || status === 403) this.infoError.set(id, 'Not authorized.');
        else if (status === 404) this.infoError.set(id, 'Teacher not found.');
        else this.infoError.set(id, err?.error?.message ?? 'Failed to load info.');
      },
    });
  }

  getInfo(id: number): TeacherInfo | null {
    return this.infoCache.get(id) ?? null;
  }
}
