import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'qr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  group: FormGroup;
  router = inject(Router);
  authSrv = inject(AuthService);
  stateSrv = inject(StateService);

  constructor() {
    this.group = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    const record = this.group.value;
    if (record.email && record.password) {
      this.authSrv.login(record.email, record.password).then(() => {
        this.router.navigate(['/agencies']);
        //this.stateSrv.toggleVisibility();
      });
    } else {
      alert('Por favor ingrese las credenciales');
    }
  }
}
