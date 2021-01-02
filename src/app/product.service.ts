import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Product {
  $key: string;
  title: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product): void {
    this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((items) =>
          items.map((item: any) => {
            const $key = item.payload.key;
            return { $key, ...item.payload.val() };
          })
        )
      );
  }
}
