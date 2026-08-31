import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Yalnızca kullanıcı deneyimi içindir — bir yönetici olmayan bu sayfayı görmese bile
 * asıl koruma orders tablosundaki insert/update politikalarındadır.
 *
 * Rotalarda authGuard'dan SONRA sıralanmalı: çıkış yapmış ziyaretçi /giris'e yönlensin,
 * sessizce ana sayfaya atılmasın.
 */
export const adminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.whenReady();

  return auth.isAdmin() ? true : router.createUrlTree(['/']);
};
