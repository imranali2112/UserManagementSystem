import { Routes } from '@angular/router'; 
import { AddUserComponent } from './components/add-user/add-user.component';
import { HomeComponent } from './components/home/home.component';
import { ReadUserComponent } from './components/read-user/read-user.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=>
            import('./components/home/home.component').then(
                (c) => HomeComponent
            ),
        pathMatch:'full'
    },
    {
        path: 'adduser',
        loadComponent: () =>
            import('./components/add-user/add-user.component').then(
                (c) => c.AddUserComponent
            )
    },
    {
        path: 'adduser/:id',
        loadComponent: () =>
            import('./components/add-user/add-user.component').then(
                (c) => c.AddUserComponent
            )
    },

    {
        path: 'viewuser',
        loadComponent: () =>
            import('./components/read-user/read-user.component').then(
                (c) => ReadUserComponent
            )
    },
    {
        path: 'viewuser/:id',
        loadComponent: () =>
            import('./components/read-user/read-user.component').then(
                (c) => ReadUserComponent
            )
    }
];
