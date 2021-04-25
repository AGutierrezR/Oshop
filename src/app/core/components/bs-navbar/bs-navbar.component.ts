import { Component } from '@angular/core';
import { AppUser } from '@core/models/app-user';
import { AuthService } from '@core/services/auth.service';
import { ShoppingCartService } from '@core/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
})
export class BsNavbarComponent {
  appUser$: Observable<AppUser> = this.auth.appUser$;
  cartQuantity$ = this.cartService.cartQuantity$;
  isMenuCollapsed = true;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {}

  logout(): void {
    this.auth.logout();
  }
}
