import { Service, signal } from '@angular/core';

@Service()
export class MobileMenuStateService {
  private readonly _open = signal(false);

  readonly open = this._open.asReadonly();

  toggle(): void {
    this._open.update((open) => !open);
  }

  setOpen(open: boolean): void {
    this._open.set(open);
  }
}
