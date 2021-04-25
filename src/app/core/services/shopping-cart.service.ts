import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '@core/models/product';
import { ShoppingCart } from '@core/models/shopping-cart';
import { ShoppingCartItemMap } from '@core/models/shopping-cart-item-map';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  cartQuantity$: Observable<number> = this.getCart().pipe(
    map((cart) => cart.totalItemsCount)
  );

  constructor(private db: AngularFireDatabase) {}

  getCart(): Observable<ShoppingCart> {
    const cartId = this.getOrCreateCartId();
    return this.db
      .object<ShoppingCartItemMap>('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x) => x.items || {}),
        map((x) => new ShoppingCart(x)),
        shareReplay()
      );
  }

  addToCart(product: Product): void {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product): void {
    this.updateItem(product, -1);
  }

  clearCart(): void {
    const cartId = this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private updateItem(product: Product, change: number): void {
    const cartId = this.getOrCreateCartId();
    const { $key: productId, title, imageUrl, price } = product;

    const item$ = this.getItem(cartId, productId);

    item$
      .snapshotChanges()
      .pipe(first())
      .subscribe((item) => {
        const quantity = (item.payload.exportVal()?.quantity || 0) + change;

        if (quantity === 0) {
          item$.remove();
          return;
        }

        item$.update({
          title,
          imageUrl,
          price,
          quantity,
        });
      });
  }

  private getOrCreateCartId(): string {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = this.createShoppingCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(
    cartId: string,
    productId: string
  ): AngularFireObject<unknown> {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private createShoppingCart(): any {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }
}
