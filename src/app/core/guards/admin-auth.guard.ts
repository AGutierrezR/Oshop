import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.appUser$.pipe(map((appUser) => appUser.isAdmin));
  }
}
