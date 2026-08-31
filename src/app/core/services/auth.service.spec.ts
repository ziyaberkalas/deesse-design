import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('kayıtlı oturum yokken çıkış yapmış durumda başlar', () => {
    expect(service.currentUser()).toBeNull();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.isAdmin()).toBe(false);
  });

  it('profil olmadan isAdmin false kalır (güvenli varsayılan)', () => {
    expect(service.profile()).toBeNull();
    expect(service.isAdmin()).toBe(false);
  });

  it('whenReady() oturum çözümlendikten sonra tamamlanır', async () => {
    await service.whenReady();
    expect(service.ready()).toBe(true);
    // Oturum yoktu, dolayısıyla hâlâ çıkış yapmış olmalı.
    expect(service.isLoggedIn()).toBe(false);
  });
});
