import { Component, OnInit } from '@angular/core';
import { AppUser } from '@core/models/app-user';
import { AuthService } from '@core/services/auth.service';
import { ShoppingCartService } from '@core/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
})
export class BsNavbarComponent implements OnInit {
  appUser$: Observable<AppUser> = this.auth.appUser$;
  cartQuantity$;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.cartQuantity$ = this.cartService
      .getCart()
      .pipe(map((cart) => cart.totalItemsCount));
  }

  logout(): void {
    this.auth.logout();
  }
}
