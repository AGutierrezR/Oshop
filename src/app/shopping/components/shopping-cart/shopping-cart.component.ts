import { Component } from '@angular/core';
import { ShoppingCart } from '@core/models/shopping-cart.model';
import { ShoppingCartService } from '@core/services/shopping-cart.service';
import { ProductQuantityMode } from '@shared/components/product-quantity/product-quantity.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cart$: Observable<ShoppingCart> = this.shoppingCartService.getCart();

  productQuantityMode = ProductQuantityMode.JustQuantity;

  constructor(public shoppingCartService: ShoppingCartService) {}
}
