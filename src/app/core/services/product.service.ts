import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '@core/models/product.model';
import { toObjectWithKey } from '@core/utils/toObjectWithKey';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: Product): void {
    this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(map(toObjectWithKey), shareReplay());
  }

  get(id: string): Observable<Product> {
    return this.db
      .object<Product>('/products/' + id)
      .valueChanges()
      .pipe(first());
  }

  update(id: string, product: Product): Promise<void> {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id: string): Promise<void> {
    return this.db.object('/products/' + id).remove();
  }
}
