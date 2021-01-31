import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
})
export class ProductFilterComponent {
  categories$ = this.categoryService.getAll();
  @Input() categerySelected: string;

  constructor(private categoryService: CategoryService) {}
}
