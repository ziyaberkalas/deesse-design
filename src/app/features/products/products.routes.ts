import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list').then((m) => m.ProductList),
    data: { titleKey: 'products' },
  },
  {
    // Ürün detayının başlığı ürün adından gelir (bkz. ProductDetail); sabit anahtar verilmez.
    path: ':id',
    loadComponent: () => import('./product-detail/product-detail').then((m) => m.ProductDetail),
  },
];
