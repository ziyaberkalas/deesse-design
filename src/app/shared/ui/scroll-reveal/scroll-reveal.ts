import { Directive, ElementRef, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  host: {
    '[class.reveal]': 'armed()',
    '[class.is-visible]': 'visible()',
  },
})
export class ScrollReveal {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly armed = signal(false);
  protected readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }

      this.armed.set(true);

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.visible.set(true);
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 },
      );

      observer.observe(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
