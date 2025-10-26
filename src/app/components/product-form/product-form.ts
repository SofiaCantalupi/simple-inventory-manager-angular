import { Component, inject, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product-service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private productService = inject(ProductService);

  selectedProduct = this.productService.getSelectedProduct();

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    photo: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]),
  });

  constructor() {
    effect(() => {
      const product = this.selectedProduct();

      if (product) {
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          stock: product.stock,
          photo: product.photo
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
    };


    // verificar si se esta editando o creando un producto

    if (this.selectedProduct()) {
      // modo edicion
      const updatedProduct = {
        id: this.selectedProduct()!.id,
        ...formData
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
    });
  }

  // si selectProduct NO es undefined, es decir, hay un produdcto seleccionado, retorna true
  get isEditMode(): boolean{
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
}


/* // Cancelar edición
  onCancel() {
    this.productService.clearSelection();
    this.productForm.reset({
      name: '',
      price: 0,
      stock: 0,
      photo: ''
    });
  } */
