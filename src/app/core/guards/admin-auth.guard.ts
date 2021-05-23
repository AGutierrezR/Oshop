import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.appUser$.pipe(
      map(({ isAdmin }) => {
        if (!isAdmin) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}
