import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './home/home';
import { Customers } from './components/customers/customers';
import { Individuals } from './components/individuals/individuals';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'home',
    component: Home,
    children: [
      { path: 'customers', component: Customers },
      { path: 'individuals', component: Individuals }
    ]
  },
  { path: '**', redirectTo: 'home/customers' }
];

