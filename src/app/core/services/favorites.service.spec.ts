import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('starts with no favorites', () => {
    expect(service.count()).toBe(0);
    expect(service.isFavorite('elegance')).toBe(false);
  });

  it('toggle() adds then removes a product id, updating count and isFavorite', () => {
    service.toggle('elegance');
    expect(service.isFavorite('elegance')).toBe(true);
    expect(service.count()).toBe(1);

    service.toggle('elegance');
    expect(service.isFavorite('elegance')).toBe(false);
    expect(service.count()).toBe(0);
  });

  it('persists favorites to localStorage across service instances', () => {
    service.toggle('elegance');
    service.toggle('sienna');

    // Force a fresh injector so the new instance re-reads localStorage instead of reusing the cached singleton.
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const rehydrated = TestBed.inject(FavoritesService);

    expect(rehydrated).not.toBe(service);
    expect(rehydrated.isFavorite('elegance')).toBe(true);
    expect(rehydrated.isFavorite('sienna')).toBe(true);
    expect(rehydrated.count()).toBe(2);
  });
});
