import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

interface User {
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  login(): void {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
