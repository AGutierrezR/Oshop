import { Component, OnInit } from '@angular/core';
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
    private categoryService: CategoryService,
    public productService: ProductService
  ) {}

  ngOnInit(): void {}
}
