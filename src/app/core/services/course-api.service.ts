import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
  Course,
  CourseCreateDto,
  CourseUpdateDto
} from '../models/course.models';

// Service for handling course-related API calls
@Injectable({
  providedIn: 'root',
})
export class CourseApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/course`;

  constructor(private http: HttpClient) {}

  // GET /api/Courses
  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  // GET /api/Courses/{id}
  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  // POST /api/Courses
  create(dto: CourseCreateDto): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, dto);
  }

  // PUT /api/Courses/{id}
  update(id: number, dto: CourseUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  // DELETE /api/Courses/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
