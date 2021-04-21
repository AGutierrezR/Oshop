import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from '@models/order';
import { Shipping } from '@models/shipping';
import { ShoppingCart } from '@models/shopping-cart';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { OrderService } from 'src/app/order.service';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent implements OnInit, OnDestroy {
  @ViewChild(NgForm) shippingForm: NgForm;

  destroyComponent$: Subject<void> = new Subject();
  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  userId: string;
  cart: ShoppingCart;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.getCart();
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next();
    this.destroyComponent$.complete();
  }

  placeOrder(): void {
    if (this.shippingForm.invalid) {
      return;
    }

    const order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.storeOrder(order);
  }

  private getUserId(): void {
    this.authService.user$
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe((user) => (this.userId = user.uid));
  }

  private async getCart(): Promise<void> {
    (await this.shoppingCartService.getCart())
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe((cart) => (this.cart = cart));
  }
}
