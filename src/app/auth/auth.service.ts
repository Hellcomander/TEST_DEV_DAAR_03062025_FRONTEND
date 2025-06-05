import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router: Router = inject(Router);

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // decodificamos el token para obtener el payload
      const { exp } = jwtDecode<{ exp: number }>(token);

      if (!exp) return false; // si no tiene expiración, consideramos inválido

      // exp es un timestamp en segundos
      const isExpired = Date.now() >= exp * 1000;

      return !isExpired;
    } catch (error) {
      // si el token está mal formado o no se puede decodificar, inválido
      return false;
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
