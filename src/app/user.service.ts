import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User): Promise<void> {
    return this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
