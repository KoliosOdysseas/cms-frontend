
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

import { CourseList } from './features/courses/pages/course-list/course-list';
import { CourseForm } from './features/courses/pages/course-form/course-form';
import { TeacherList } from './features/teachers/pages/teacher-list/teacher-list';
import { TeacherForm } from './features/teachers/pages/teacher-form/teacher-form';
import { StudentList } from './features/students/pages/student-list/student-list';
import { StudentForm } from './features/students/pages/student-form/student-form';
import { CourseEnrollments } from './features/courses/pages/course-enrollments/course-enrollments';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'courses', component: CourseList, canActivate: [authGuard] },
  { path: 'courses/new', component: CourseForm, canActivate: [authGuard] },
  { path: 'courses/:id/edit', component: CourseForm, canActivate: [authGuard] },
  { path: 'courses/:id/enrollments', component: CourseEnrollments, canActivate: [authGuard] },


  { path: 'teachers', component: TeacherList, canActivate: [authGuard] },
  { path: 'teachers/new', component: TeacherForm, canActivate: [authGuard] },
  { path: 'teachers/:id/edit', component: TeacherForm, canActivate: [authGuard] },

  { path: 'students', component: StudentList, canActivate: [authGuard] },
{ path: 'students/new', component: StudentForm, canActivate: [authGuard] },
{ path: 'students/:id/edit', component: StudentForm, canActivate: [authGuard] },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },

  { path: '**', redirectTo: '' },
];
