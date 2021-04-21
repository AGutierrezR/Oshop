import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderItem } from '@models/order-item';
import { Shipping } from '@models/shipping';
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

  destroyComponent$ = new Subject();
  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  items: OrderItem[];
  userId: string;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.getOrderItems();
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next();
    this.destroyComponent$.complete();
  }

  placeOrder(): void {
    if (this.shippingForm.invalid) {
      return;
    }

    const order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.items,
    };

    this.orderService.storeOrder(order);
  }

  private getUserId(): void {
    this.authService.user$
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe((user) => (this.userId = user.uid));
  }

  private async getOrderItems(): Promise<void> {
    (await this.shoppingCartService.getCart())
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe((cart) => {
        this.items = cart.items.map((i) => {
          return {
            product: {
              title: i.title,
              imageUrl: i.imageUrl,
              price: i.price,
            },
            quantity: i.quantity,
            totalPrice: i.totalPrice,
          };
        });
      });
  }
}
