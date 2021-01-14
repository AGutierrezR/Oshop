import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toObjectWithKey } from 'src/app/shared/utils/toObjectWithKey';

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
