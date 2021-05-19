import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .btn-google {
        color: #545454;
        background-color: #ffffff;
        box-shadow: 0 1px 2px 1px #ddd;
      }
    `,
  ],
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  login(): void {
    this.auth.login();
  }
}
