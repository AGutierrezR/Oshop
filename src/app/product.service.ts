import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface Product {
  $key?: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

const initialState = {
  title: null,
  price: 0,
  category: null,
  imageUrl: null,
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productSubject = new BehaviorSubject<Product>({ ...initialState });
  productStore$ = this.productSubject.asObservable();

  constructor(private db: AngularFireDatabase) {}

  create(product: Product): void {
    this.db.list('/products').push(product);
    this.setInitialState();
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

  get(id: string): void {
    this.db
      .object<Product>('/products/' + id)
      .valueChanges()
      .pipe(
        take(1),
        map((product) => this.productSubject.next(product))
      )
      .subscribe();
  }

  update(id: string, product: Product): Promise<void> {
    return this.db.object('/products/' + id).update(product);
  }

  setInitialState(): void {
    this.productSubject.next({ ...initialState });
  }
}
