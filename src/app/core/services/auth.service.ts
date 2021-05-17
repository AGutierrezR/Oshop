import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '@core/models/app-user.model';
import { UserService } from '@core/services/user.service';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  appUser$: Observable<AppUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;

    this.appUser$ = this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid);
        }

        return of(null);
      })
    );
  }

  async login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credentials = await this.afAuth.signInWithPopup(provider);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigateByUrl(returnUrl);

    return this.userService.save(credentials.user);
  }

  async logout(): Promise<boolean> {
    await this.afAuth.signOut();
    return this.router.navigateByUrl('/');
  }
}
