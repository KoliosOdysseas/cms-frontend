import { Routes } from '@angular/router';

import { CourseList } from './features/courses/pages/course-list/course-list';
import { CourseForm } from './features/courses/pages/course-form/course-form';
import { TeacherList } from './features/teachers/pages/teacher-list/teacher-list';
import { TeacherForm } from './features/teachers/pages/teacher-form/teacher-form';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },

  { path: 'courses', component: CourseList },
  { path: 'courses/new', component: CourseForm },
  { path: 'courses/:id/edit', component: CourseForm },

  { path: 'teachers', component: TeacherList },
  { path: 'teachers/new', component: TeacherForm },
  { path: 'teachers/:id/edit', component: TeacherForm },

  { path: '**', redirectTo: 'courses' },
];
