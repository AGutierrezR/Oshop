import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '@core/models/order';
import { Shipping } from '@core/models/shipping';
import { ShoppingCart } from '@core/models/shopping-cart';
import { AuthService } from '@core/services/auth.service';
import { OrderService } from '@core/services/order.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit {
  @ViewChild(NgForm) shippingForm: NgForm;
  @Input() cart: ShoppingCart;

  userId: string;
  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getUserId();
  }

  private getUserId(): void {
    this.authService.user$
      .pipe(take(1))
      .subscribe((user) => (this.userId = user.uid));
  }

  async placeOrder(): Promise<void> {
    if (this.shippingForm.invalid) {
      return;
    }

    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
