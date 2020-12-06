import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  user: firebase.default.User;
  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user) => (this.user = user));
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
