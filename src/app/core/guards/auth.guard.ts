import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Yalnızca kullanıcı deneyimi içindir — asıl güvenlik sınırı veritabanındaki RLS
 * politikalarıdır (bkz. supabase/migrations/*.sql).
 */
export const authGuard: CanActivateFn = async (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.whenReady();

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/giris'], { queryParams: { redirect: state.url } });
};
