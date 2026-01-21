import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StudentReadDto } from '../../../core/models/student.models';

export interface EnrollmentCreateDto {
  studentId: number;
  courseId: number;
}

// Service to manage enrollments
@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'https://localhost:7286/api/Enrollment';

  getStudentsByCourse(courseId: number): Observable<StudentReadDto[]> {
    return this.http.get<StudentReadDto[]>(
      `${this.baseUrl}/course/${courseId}/students`
    );
  }

  enroll(dto: EnrollmentCreateDto): Observable<void> {
    return this.http.post<void>(this.baseUrl, dto);
  }

  unenroll(studentId: number, courseId: number): Observable<void> {
    const params = new HttpParams()
      .set('studentId', studentId)
      .set('courseId', courseId);

    return this.http.delete<void>(this.baseUrl, { params });
  }
}
