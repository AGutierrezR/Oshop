import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '@models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

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
