import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Ana Sayfa',
  },
  {
    path: 'urunler',
    loadChildren: () => import('./features/products/products.routes').then((m) => m.PRODUCTS_ROUTES),
  },
  {
    path: 'iletisim',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'İletişim',
  },
  {
    path: 'favoriler',
    loadComponent: () => import('./features/favorites/favorites').then((m) => m.Favorites),
    title: 'Favorilerim',
  },
  {
    path: 'giris',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    title: 'Giriş Yap',
  },
  {
    path: 'kayit',
    loadComponent: () => import('./features/auth/signup/signup').then((m) => m.Signup),
    title: 'Kayıt Ol',
  },
  {
    path: 'hesabim',
    loadComponent: () => import('./features/account/account').then((m) => m.Account),
    canActivate: [authGuard],
    title: 'Hesabım',
  },
  {
    // authGuard önce gelmeli: çıkış yapmış ziyaretçi /giris'e yönlensin, adminGuard'ın
    // sessizce ana sayfaya atmasına düşmesin.
    path: 'yonetim/siparisler',
    loadComponent: () => import('./features/admin/admin-orders/admin-orders').then((m) => m.AdminOrders),
    canActivate: [authGuard, adminGuard],
    title: 'Sipariş Yönetimi',
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    title: 'Sayfa Bulunamadı',
  },
];
