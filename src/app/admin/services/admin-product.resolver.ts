import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminProductResolver implements Resolve<Product> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.paramMap.get('id');
    return this.productService.get(id);
  }
}
