import { Component } from '@angular/core';
import { ShoppingCart } from '@core/models/shopping-cart.model';
import { ShoppingCartService } from '@core/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent {
  cart$: Observable<ShoppingCart> = this.shoppingCartService.getCart();

  constructor(private shoppingCartService: ShoppingCartService) {}
}
