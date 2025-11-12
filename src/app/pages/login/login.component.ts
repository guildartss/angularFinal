import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  ingresar() {
    const { user, pass } = this.form.value;
    if (this.auth.login(user ?? '', pass ?? '')) {
      this.router.navigate(['/facturas']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}