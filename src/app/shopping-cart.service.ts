import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '@models/product';
import { Observable } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<unknown>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  async addToCart(product: Product): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    const { $key: productId, ..._product } = product;

    const item$ = this.getItem(cartId, productId);

    item$
      .snapshotChanges()
      .pipe(first())
      .subscribe((item) => {
        if (item.payload.exists()) {
          item$.update({
            quantity: item.payload.exportVal().quantity + 1,
          });
        } else {
          item$.update({ product: _product, quantity: 1 });
        }
      });
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.createShoppingCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private createShoppingCart(): any {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(
    cartId: string,
    productId: string
  ): AngularFireObject<unknown> {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }
}
