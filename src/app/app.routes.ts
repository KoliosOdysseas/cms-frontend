import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

// Κράτα τα δικά σου imports όπως είναι για Courses/Teachers pages
import { CourseList } from './features/courses/pages/course-list/course-list';
import { CourseForm } from './features/courses/pages/course-form/course-form';
import { TeacherList } from './features/teachers/pages/teacher-list/teacher-list';
import { TeacherForm } from './features/teachers/pages/teacher-form/teacher-form';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'courses', component: CourseList },
  { path: 'courses/new', component: CourseForm },
  { path: 'courses/:id/edit', component: CourseForm },

  { path: 'teachers', component: TeacherList },
  { path: 'teachers/new', component: TeacherForm },
  { path: 'teachers/:id/edit', component: TeacherForm },

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
