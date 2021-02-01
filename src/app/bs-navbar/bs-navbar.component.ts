import { Component, OnInit } from '@angular/core';
import { AppUser } from '@models/app-user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

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
    this.cartQuantity$ = (await this.cartService.getCart()).pipe(
      map((cart) => {
        let qts = 0;
        for (const productId in cart.items) {
          if (cart.items[productId]) {
            qts += cart.items[productId].quantity;
          }
        }
        return qts;
      })
    );
  }

  logout(): void {
    this.auth.logout();
  }
}
