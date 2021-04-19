import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '@models/product';
import { ShoppingCart } from '@models/shopping-cart';
import { ShoppingCartItemMap } from '@models/shopping-cart-item-map';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
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

  async addToCart(product: Product): Promise<void> {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product): Promise<void> {
    this.updateItem(product, -1);
  }

  async clearCart(): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItem(product: Product, change: number): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    const { $key: productId, title, imageUrl, price } = product;

    const item$ = this.getItem(cartId, productId);

    item$
      .snapshotChanges()
      .pipe(first())
      .subscribe((item) => {
        item$.update({
          title,
          imageUrl,
          price,
          quantity: (item.payload.exportVal()?.quantity || 0) + change,
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
