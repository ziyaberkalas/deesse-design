import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('çıkış yapmış kullanıcıyı redirect parametresiyle /giris adresine yönlendirir', async () => {
    const result = await TestBed.runInInjectionContext(() =>
      authGuard({} as never, { url: '/hesabim' } as never),
    );

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toContain('/giris');
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toContain('redirect');
  });

  it('karar vermeden önce oturumun çözümlenmesini bekler', async () => {
    const auth = TestBed.inject(AuthService);
    await TestBed.runInInjectionContext(() => authGuard({} as never, { url: '/hesabim' } as never));
    expect(auth.ready()).toBe(true);
  });
});
