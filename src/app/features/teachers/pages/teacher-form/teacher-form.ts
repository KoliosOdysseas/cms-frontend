import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../services/teacher';
import {
  TeacherCreateDto,
  TeacherUpdateDto,
} from '../../../../core/models/teacher.models';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-form.html',
  styleUrl: './teacher-form.scss',
})
export class TeacherForm {
  private teacherService = inject(TeacherService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  isEdit = false;

  loading = false;
  error: string | null = null;

  model: TeacherCreateDto = {
    fullName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
      this.loadTeacher(this.id);
    }
  }

  private loadTeacher(id: number): void {
    this.loading = true;
    this.teacherService.getById(id).subscribe({
      next: (t) => {
        this.model = {
          fullName: t.fullName,
          email: t.email,
          phone: t.phone ?? '',
        };
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Failed to load teacher.';
      },
    });
  }

  save(): void {
    if (!this.model.fullName || !this.model.email) {
      this.error = 'Full name and Email are required.';
      return;
    }

    this.loading = true;
    this.error = null;

    if (!this.isEdit) {
      this.teacherService.create(this.model).subscribe({
        next: () => this.router.navigateByUrl('/teachers'),
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message ?? 'Create failed.';
        },
      });
      return;
    }

    const updateDto: TeacherUpdateDto = { ...this.model };

    this.teacherService.update(this.id!, updateDto).subscribe({
      next: () => this.router.navigateByUrl('/teachers'),
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Update failed.';
      },
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/teachers');
  }
}
