import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student';
import { StudentCreateDto, StudentUpdateDto } from '../../../../core/models/student.models';

// Component for creating and editing student records
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss',
})
export class StudentForm {
  private studentService = inject(StudentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  isEdit = false;

  loading = false;
  error: string | null = null;

  model: StudentCreateDto = {
    fullName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
      this.loadStudent(this.id);
    }
  }

  private loadStudent(id: number): void {
    this.loading = true;
    this.error = null;

    this.studentService.getById(id).subscribe({
      next: (s) => {
        this.model = {
          fullName: s.fullName,
          email: s.email,
          phone: s.phone ?? '',
        };
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Failed to load student.';
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
      this.studentService.create(this.model).subscribe({
        next: () => this.router.navigateByUrl('/students'),
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message ?? 'Create failed.';
        },
      });
      return;
    }

    const dto: StudentUpdateDto = { ...this.model };

    this.studentService.update(this.id!, dto).subscribe({
      next: () => this.router.navigateByUrl('/students'),
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Update failed.';
      },
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/students');
  }
}
