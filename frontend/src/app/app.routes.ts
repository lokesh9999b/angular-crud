import { Routes } from '@angular/router';
import { StudentsList } from './components/students-list/students-list';

export const routes: Routes = [
    {
        path: '',
        component: StudentsList
    },
    {
        path: 'students/edit/:rollNumber',
        loadComponent: () => import('./components/edit-students/edit-students').then(m => m.EditStudents)
    },
    {
        path: 'students/add',
        loadComponent: () => import('./components/add-students/add-students').then(m => m.AddStudents)
    }
];
