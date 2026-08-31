import { Service, computed, signal } from '@angular/core';

const STORAGE_KEY = 'deesse-favorites';

@Service()
export class FavoritesService {
  private readonly _favoriteIds = signal<ReadonlySet<string>>(this.readStored());

  readonly favoriteIds = this._favoriteIds.asReadonly();
  readonly count = computed(() => this._favoriteIds().size);

  isFavorite(productId: string): boolean {
    return this._favoriteIds().has(productId);
  }

  toggle(productId: string): void {
    const next = new Set(this._favoriteIds());
    if (next.has(productId)) {
      next.delete(productId);
    } else {
      next.add(productId);
    }
    this._favoriteIds.set(next);
    this.persist(next);
  }

  private readStored(): ReadonlySet<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  }

  private persist(ids: ReadonlySet<string>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    } catch {
      // localStorage unavailable (private browsing quota, etc.) -- favorites just won't persist
    }
  }
}
