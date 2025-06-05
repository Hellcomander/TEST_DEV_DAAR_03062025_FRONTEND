import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoginDto } from '../../dtos/login.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;
  isLoading: boolean = false;
  private http = inject(HttpClient);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;

    const formValues = this.loginForm.value;

    const authData: LoginDto = {
      Correo: formValues.email,
      Password: formValues.password,
    }

    this.http.post(`${environment.apiUrl}/candidato/api/login/authenticate`, {
      params: authData
    }).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error en login', error);
        this.isLoading = false;
      },
    })
  }

  get emailInput() {
    return this.loginForm.get('email');
  }
}
