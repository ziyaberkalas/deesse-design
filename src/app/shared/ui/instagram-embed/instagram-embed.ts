import { Component, DestroyRef, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { InstagramEmbedLoaderService } from '../../../core/services/instagram-embed-loader.service';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-instagram-embed',
  templateUrl: './instagram-embed.html',
  styleUrl: './instagram-embed.css',
})
export class InstagramEmbed {
  private readonly loader = inject(InstagramEmbedLoaderService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly language = inject(LanguageService);

  protected readonly t = this.language.t;

  readonly postUrl = input.required<string>();

  constructor() {
    afterNextRender(() => {
      this.watchForIframe();
      this.loader.ensureScriptLoaded().then(() => this.loader.process());
    });
  }

  /** Instagram's embed.js replaces the blockquote with a titleless iframe; give it an accessible name. */
  private watchForIframe(): void {
    const host = this.elementRef.nativeElement;

    const labelIframe = (): boolean => {
      const iframe = host.querySelector('iframe');
      if (iframe && !iframe.title) {
        iframe.title = this.t().instagram.embedTitle;
      }
      return !!iframe;
    };

    if (labelIframe()) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (labelIframe()) {
        observer.disconnect();
      }
    });
    observer.observe(host, { childList: true, subtree: true });
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
