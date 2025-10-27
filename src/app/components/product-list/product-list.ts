import { Component, inject } from '@angular/core';
import { ProductService } from '../../service/product-service';
import { ProductCard } from '../product-card/product-card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  private productService = inject(ProductService);

  products = this.productService.getProducts();
}
