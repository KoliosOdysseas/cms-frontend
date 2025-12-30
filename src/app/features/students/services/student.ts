import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  StudentReadDto,
  StudentCreateDto,
  StudentUpdateDto,
} from '../../../core/models/student.models';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);

  // Στο swagger σου τα routes είναι τύπου /api/Course και /api/Teacher (singular, PascalCase)
  private readonly baseUrl = 'https://localhost:7286/api/Student';

  getAll(): Observable<StudentReadDto[]> {
    return this.http.get<StudentReadDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<StudentReadDto> {
    return this.http.get<StudentReadDto>(`${this.baseUrl}/${id}`);
  }

  create(dto: StudentCreateDto): Observable<StudentReadDto> {
    return this.http.post<StudentReadDto>(this.baseUrl, dto);
  }

  update(id: number, dto: StudentUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}