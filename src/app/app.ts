import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ProductForm } from './components/product-form/product-form';
import { ProductList } from "./components/product-list/product-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    Header, 
    ProductForm, 
    ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-practice-inventory');


}
