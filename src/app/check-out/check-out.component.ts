import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '@core/models/shopping-cart';
import { ShoppingCartService } from '@core/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  private async getCart(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
