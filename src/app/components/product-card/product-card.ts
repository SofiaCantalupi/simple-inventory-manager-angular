import { Component, inject, input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../service/product-service';
import { CategoryService } from '../../service/category-service';
import { SupplierService } from '../../service/supplier-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  // recibe un producto del padre
  product = input.required<Product>();

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);
  private router = inject(Router);

  // Obtener nombre de la categoría
  getCategoryName(): string {
    const category = this.categoryService.getCategoryById(this.product().categoryId);
    return category?.name || 'N/A';
  }

  // Obtener nombre del proveedor
  getSupplierName(): string {
    const supplier = this.supplierService.getSupplierById(this.product().supplierId);
    return supplier?.name || 'N/A';
  }

  onDelete() {
    const name = this.product().name;

    if (confirm(`Estas seguro que queres borrar el "${name}"`)) {
      this.productService.deleteProduct(this.product().id);
    }
  }

  onUpdate() {
    this.productService.selectProduct(this.product());
    /*  window.scrollTo({ top: 0, behavior: 'smooth' });*/
  }
}
