import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  it('defaults to light when there is no stored preference (jsdom has no matchMedia)', () => {
    const service = TestBed.inject(ThemeService);
    expect(service.effectiveTheme()).toBe('light');
  });

  it('toggle() flips the theme, applies it to <html>, and persists it', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();
    TestBed.flushEffects();
    expect(service.effectiveTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('deesse-theme')).toBe('dark');

    service.toggle();
    TestBed.flushEffects();
    expect(service.effectiveTheme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('picks up a previously stored preference on construction', () => {
    localStorage.setItem('deesse-theme', 'dark');
    const service = TestBed.inject(ThemeService);
    expect(service.effectiveTheme()).toBe('dark');
  });
});
