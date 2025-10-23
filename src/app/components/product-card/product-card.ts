import { Component, inject, input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../service/product-service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard { 
  // recibe un producto del padre
  product = input.required<Product>();

  private productService = inject(ProductService);

  onDelete(){
    const name = this.product().name;

    if(confirm(`Estas seguro que queres borrar el "${name}"`)) {
      this.productService.deleteProduct(this.product().id);
    }
  }

  onUpdate(){
    this.productService.selectProduct(this.product());
   /*  window.scrollTo({ top: 0, behavior: 'smooth' });*/
  }

}
