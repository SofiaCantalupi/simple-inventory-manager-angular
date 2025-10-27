import { Component, inject, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product-service';
import { CategoryService } from '../../service/category-service';
import { SupplierService } from '../../service/supplier-service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);

  categories = this.categoryService.getCategories();
  suppliers = this.supplierService.getSuppliers();

  selectedProduct = this.productService.getSelectedProduct();

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    photo: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]),
    categoryId: new FormControl(0, [Validators.required, Validators.min(1)]),
    supplierId: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  constructor() {
    effect(() => {
      const product = this.selectedProduct();

      if (product) {
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          stock: product.stock,
          photo: product.photo,
          categoryId: product.categoryId,
          supplierId: product.supplierId,
        });
      }
    });
  }

  onSubmit() {
    // se marcan todos los campos como touched para que se muestren los errores
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      alert('Debe completar todos los campos correctamente.');
      return;
    }

    // se obtienen los datos del form
    const formData = {
      name: this.productForm.value.name!,
      price: this.productForm.value.price!,
      stock: this.productForm.value.stock!,
      photo: this.productForm.value.photo!,
      categoryId: this.productForm.value.categoryId!,
      supplierId: this.productForm.value.supplierId!,
    };

    // OTRA OPCION: Extraer todos los campos automáticamente CON 
    // const productData = this.productForm.getRawValue();

    // verificar si se esta editando o creando un producto

    if (this.selectedProduct()) {
      // modo edicion
      const updatedProduct = {
        id: this.selectedProduct()!.id,
        ...formData,
      };

      this.productService.updateProduct(updatedProduct);
      this.productService.clearSelection();
      alert('Product updated successfully.');
    } else {
      // modo creacion
      this.productService.addProduct(formData);
    }

    // limpiar formulario
    this.productForm.reset({
      name: '',
      price: 0,
      stock: 0,
      photo: '',
      categoryId: 0,
      supplierId: 0,
    });
  }

  // si selectProduct NO es undefined, es decir, hay un produdcto seleccionado, retorna true
  get isEditMode(): boolean {
    return this.selectedProduct() !== undefined;
  }

  get name() {
    return this.productForm.get('name')!;
  }

  get price() {
    return this.productForm.get('price')!;
  }

  get stock() {
    return this.productForm.get('stock')!;
  }

  get photo() {
    return this.productForm.get('photo')!;
  }

  get categoryId() {
    return this.productForm.get('categoryId')!;
  }

  get supplierId() {
    return this.productForm.get('supplierId')!;
  }
}

/* // Cancelar edición
  onCancel() {
    this.productService.clearSelection();
    this.productForm.reset({
      name: '',
      price: 0,
      stock: 0,
      photo: '',
      categoryId: 0,      
      supplierId: 0
    });
  } */
