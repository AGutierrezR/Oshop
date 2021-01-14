import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { toObjectWithKey } from 'src/app/shared/utils/toObjectWithKey';

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
      .pipe(map(toObjectWithKey));
  }

  get(id: string): void {
    this.db
      .object<Product>('/products/' + id)
      .valueChanges()
      .pipe(first())
      .subscribe((product) => this.productSubject.next(product));
  }

  update(id: string, product: Product): Promise<void> {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id: string): Promise<void> {
    return this.db.object('/products/' + id).remove();
  }

  setInitialState(): void {
    this.productSubject.next({ ...initialState });
  }
}
