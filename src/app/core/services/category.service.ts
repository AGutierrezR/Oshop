import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { toObjectWithKey } from '@core/utils/toObjectWithKey';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface ProductCategory {
  $key?: string;
  name: string;
  count?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  create(category: ProductCategory): void {
    this.db
      .list('/categories')
      .set(category.name.toLowerCase().replace(' ', ''), category);
  }

  getAll(): Observable<ProductCategory[]> {
    return this.db
      .list('/categories', (ref) => {
        return ref.orderByChild('name');
      })
      .snapshotChanges()
      .pipe(map(toObjectWithKey), shareReplay());
  }

  update(id: string, category: ProductCategory): Promise<void> {
    return this.db.object('/categories/' + id).update(category);
  }

  delete(id: string): Promise<void> {
    return this.db.object('/categories/' + id).remove();
  }
}
