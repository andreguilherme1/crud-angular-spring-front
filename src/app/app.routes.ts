import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadComponent: () => import('./components/courses/courses/courses.component').then((m) => m.Courses),
  },
  {
    path: 'courses/new',
    loadComponent: () => import('./components/courses/form/form.component').then((m) => m.FormComponent),
  },
];
