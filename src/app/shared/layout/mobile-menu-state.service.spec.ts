import { TestBed } from '@angular/core/testing';
import { MobileMenuStateService } from './mobile-menu-state.service';

describe('MobileMenuStateService', () => {
  let service: MobileMenuStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileMenuStateService);
  });

  it('starts closed and toggles open/closed', () => {
    expect(service.open()).toBe(false);
    service.toggle();
    expect(service.open()).toBe(true);
    service.toggle();
    expect(service.open()).toBe(false);
  });

  it('setOpen sets the state directly', () => {
    service.setOpen(true);
    expect(service.open()).toBe(true);
    service.setOpen(false);
    expect(service.open()).toBe(false);
  });
});
