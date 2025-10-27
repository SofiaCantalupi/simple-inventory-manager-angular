import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { signal } from '@angular/core';
import { CategoryService } from './category-service';
import { SupplierService } from './supplier-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);

  private products = signal<Product[]>([]); // tiene que tener un array vacio o con algunos valores, tiene que tener un valor asignado si o si

  selectedProduct = signal<Product | undefined>(undefined);

  private nextId = signal(1);

  // Permite seleccionar el producto que va a ser editado
  selectProduct(product: Product) {
    this.selectedProduct.set(product);
  }

  // limpia seleccion
  clearSelection(){
    this.selectedProduct.set(undefined);
  }

  getSelectedProduct() {
    return this.selectedProduct.asReadonly();
  }

  getProducts() {
    return this.products.asReadonly();
  }

  getProductById(id: number): Product|undefined{
    return this.products().find(p => p.id === id);
  }

  addProduct(productData: Omit<Product, 'id'>) {
    const newProduct: Product = {
      id: this.nextId(),
      ...productData,
    };

    this.products.update((list) => [...list, newProduct]);
    this.nextId.update((id) => id + 1);
  }

  deleteProduct(id: number) {
    this.products.update((list) => list.filter((product) => product.id !== id));
  }

  updateProduct(updatedProduct: Product) {
    this.products.update((list) =>
      list.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  }

    // Obtener productos filtrados por categoría
  getProductsByCategory(categoryId: number) {
    return this.products().filter(p => p.categoryId === categoryId);
  }

  // Obtener productos filtrados por proveedor
  getProductsBySupplier(supplierId: number) {
    return this.products().filter(p => p.supplierId === supplierId);
  }
}
