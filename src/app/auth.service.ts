import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

interface User {
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
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
