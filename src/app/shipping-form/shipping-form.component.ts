import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '@models/order';
import { Shipping } from '@models/shipping';
import { ShoppingCart } from '@models/shopping-cart';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { OrderService } from 'src/app/order.service';

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
