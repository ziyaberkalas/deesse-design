import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

// Başlıklar `title` yerine `data.titleKey` ile verilir; çeviri TranslatedTitleStrategy'de
// yapılır (bkz. core/i18n/translated-title.strategy.ts).
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    data: { titleKey: 'home' },
  },
  {
    path: 'urunler',
    loadChildren: () => import('./features/products/products.routes').then((m) => m.PRODUCTS_ROUTES),
  },
  {
    path: 'iletisim',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    data: { titleKey: 'contact' },
  },
  {
    path: 'favoriler',
    loadComponent: () => import('./features/favorites/favorites').then((m) => m.Favorites),
    data: { titleKey: 'favorites' },
  },
  {
    path: 'giris',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    data: { titleKey: 'login' },
  },
  {
    path: 'kayit',
    loadComponent: () => import('./features/auth/signup/signup').then((m) => m.Signup),
    data: { titleKey: 'signup' },
  },
  {
    path: 'hesabim',
    loadComponent: () => import('./features/account/account').then((m) => m.Account),
    canActivate: [authGuard],
    data: { titleKey: 'account' },
  },
  {
    // authGuard önce gelmeli: çıkış yapmış ziyaretçi /giris'e yönlensin, adminGuard'ın
    // sessizce ana sayfaya atmasına düşmesin.
    path: 'yonetim/siparisler',
    loadComponent: () => import('./features/admin/admin-orders/admin-orders').then((m) => m.AdminOrders),
    canActivate: [authGuard, adminGuard],
    data: { titleKey: 'adminOrders' },
  },
  {
    path: 'yonetim/stok',
    loadComponent: () => import('./features/admin/admin-stock/admin-stock').then((m) => m.AdminStock),
    canActivate: [authGuard, adminGuard],
    data: { titleKey: 'adminStock' },
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    data: { titleKey: 'notFound' },
  },
];
