import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products$ = this.productService.getAll();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
}
