import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TeacherInfo } from '../../../core/models/teacher-info.model';
import {
  TeacherReadDto,
  TeacherCreateDto,
  TeacherUpdateDto,
} from '../../../core/models/teacher.models';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private http = inject(HttpClient);

  // API base URL
  private readonly baseUrl = 'https://localhost:7286/api/Teacher';

  getAll(): Observable<TeacherReadDto[]> {
    return this.http.get<TeacherReadDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<TeacherReadDto> {
    return this.http.get<TeacherReadDto>(`${this.baseUrl}/${id}`);
  }

  // GET: /api/Teacher/{id}/info
  getInfo(id: number): Observable<TeacherInfo> {
    return this.http.get<TeacherInfo>(`${this.baseUrl}/${id}/info`);
  }

  create(dto: TeacherCreateDto): Observable<TeacherReadDto> {
    return this.http.post<TeacherReadDto>(this.baseUrl, dto);
  }

  update(id: number, dto: TeacherUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
