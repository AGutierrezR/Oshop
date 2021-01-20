import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { toObjectWithKey } from '@shared/utils/toObjectWithKey';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ProductCategory {
  $key: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories(): Observable<ProductCategory[]> {
    return this.db
      .list('/categories', (ref) => {
        return ref.orderByChild('name');
      })
      .snapshotChanges()
      .pipe(map(toObjectWithKey));
  }
}
