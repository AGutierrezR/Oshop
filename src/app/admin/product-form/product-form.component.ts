import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$ = this.categoryService.getCategories();

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  save(product): void {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
