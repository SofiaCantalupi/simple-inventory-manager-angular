import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { ProductForm } from '../../components/product-form/product-form';
import { ProductList } from '../../components/product-list/product-list';

@Component({
  selector: 'app-inventory',
  imports: [Header, ProductForm, ProductList],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {

}
