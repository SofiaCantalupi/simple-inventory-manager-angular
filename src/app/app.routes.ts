import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Inventory } from './pages/inventory/inventory';
import { Suppliers } from './pages/suppliers/suppliers';
import { Categories } from './pages/categories/categories';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'inventory',
        component: Inventory
    },
    {
        path: 'suppliers',
        component: Suppliers
    },
    {
        path: 'categories',
        component: Categories
    },
    {
        path: 'product/:id',
        component: ProductDetail
    },
    {
        path: '**',
        redirectTo: ''
    }
];
