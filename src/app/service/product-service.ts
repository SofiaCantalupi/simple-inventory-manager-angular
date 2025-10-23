import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
}
