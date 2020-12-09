import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      switchMap((user) => this.userService.get(user.uid)),
      map((appUser) => appUser.isAdmin)
    );
  }
}
