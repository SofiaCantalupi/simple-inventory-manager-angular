import { Component, inject, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product-service';
import { Product } from '../../interfaces/product';
import { Location } from '@angular/common';
import { ProductForm } from '../../components/product-form/product-form';

@Component({
  selector: 'app-product-detail',
  imports: [ProductCard, ProductForm],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private productService = inject(ProductService);

  product = signal<Product | undefined>(undefined);


  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      const productFound = this.productService.getProductById(Number(id));
      this.product.set(productFound);
      if(productFound){
         this.productService.selectProduct(productFound);
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
