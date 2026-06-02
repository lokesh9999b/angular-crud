import {Routes} from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login),
    },
    {
        path: 'students',
        canActivate: [authGuard],
        loadComponent: () => import('./components/students-list/students-list').then(m => m.StudentsList),
    },
    {
        path: 'students/add',
        canActivate: [authGuard],
        loadComponent: () => import('./components/add-students/add-students').then(m => m.AddStudents),
    },
    {
        path: 'students/edit/:rollNumber',
        canActivate: [authGuard],
        loadComponent: () => import('./components/edit-students/edit-students').then(m => m.EditStudents),
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];