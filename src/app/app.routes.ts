import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadComponent: () => import('./components/courses/courses').then((m) => m.Courses),
  },
];
