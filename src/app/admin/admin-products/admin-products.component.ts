import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products$ = this.productService.getAll();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(id);
  }
}
