import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CourseApiService } from '../../../../core/services/course-api.service';
import { CourseCreateDto, CourseUpdateDto, Course } from '../../../../core/models/course.models';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseForm {
  // UI state
  loading = false;
  saving = false;
  error = '';

  // create vs edit
  isEdit = false;
  courseId: number | null = null;

  // form model (matches DTO fields)
  model: CourseCreateDto = {
    title: '',
    description: '',
    credits: 0,
    startDate: '',
    endDate: '',
    teacherId: null,
  };

  constructor(
    private courseApi: CourseApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEdit = true;
      this.courseId = Number(idParam);
      this.loadCourse(this.courseId);
    } else {
      this.isEdit = false;
      this.courseId = null;
    }
  }

  private loadCourse(id: number): void {
    this.loading = true;
    this.error = '';

    this.courseApi.getById(id).subscribe({
      next: (c: Course) => {
        // fill form from API response
        this.model = {
          title: c.title ?? '',
          description: c.description ?? '',
          credits: c.credits ?? 0,
          startDate: (c.startDate ?? '').slice(0, 10), // keep yyyy-MM-dd for <input type="date">
          endDate: (c.endDate ?? '').slice(0, 10),
          teacherId: c.teacherId ?? null,
        };
      },
      error: () => {
        this.error = 'Αποτυχία φόρτωσης μαθήματος.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    this.saving = true;
    this.error = '';

    // Normalize teacherId (empty input => null)
    const teacherId =
      this.model.teacherId === ('' as any) ? null : this.model.teacherId;

    const dto: CourseCreateDto = {
      title: this.model.title.trim(),
      description: this.model.description?.trim() || null as any,
      credits: Number(this.model.credits),
      startDate: this.model.startDate,
      endDate: this.model.endDate,
      teacherId: teacherId === null ? null : Number(teacherId),
    };

    if (!this.isEdit) {
      // CREATE
      this.courseApi.create(dto).subscribe({
        next: () => this.router.navigateByUrl('/courses'),
        error: () => {
          this.error = 'Αποτυχία δημιουργίας μαθήματος.';
          this.saving = false;
        },
        complete: () => (this.saving = false),
      });
      return;
    }

    // UPDATE
    const updateDto: CourseUpdateDto = { ...dto };

    this.courseApi.update(this.courseId!, updateDto).subscribe({
      next: () => this.router.navigateByUrl('/courses'),
      error: () => {
        this.error = 'Αποτυχία ενημέρωσης μαθήματος.';
        this.saving = false;
      },
      complete: () => (this.saving = false),
    });
  }

  onCancel(): void {
    this.router.navigateByUrl('/courses');
  }
}
