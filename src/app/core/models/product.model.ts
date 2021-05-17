export class Product {
  $key?: string;
  title = '';
  price = 0;
  category = '';
  imageUrl = '';

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
