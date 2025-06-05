import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './home/home';
import { Customers } from './components/customers/customers';
import { Individuals } from './components/individuals/individuals';
import { LoginGuard } from './auth/login.guard';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [LoginGuard] },
  {
    path: 'home',
    component: Home,
    children: [
      { path: 'customers', component: Customers },
      { path: 'individuals', component: Individuals }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home/customers' }
];

