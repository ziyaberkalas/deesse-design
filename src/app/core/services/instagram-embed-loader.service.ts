import { Service } from '@angular/core';

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

const EMBED_SCRIPT_SRC = 'https://www.instagram.com/embed.js';

@Service()
export class InstagramEmbedLoaderService {
  private loadPromise: Promise<void> | null = null;

  ensureScriptLoaded(): Promise<void> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SCRIPT_SRC}"]`);
    if (existingScript) {
      this.loadPromise = Promise.resolve();
      return this.loadPromise;
    }

    this.loadPromise = new Promise<void>((resolve) => {
      const script = document.createElement('script');
      script.src = EMBED_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.body.appendChild(script);
    });

    return this.loadPromise;
  }

  process(): void {
    window.instgrm?.Embeds.process();
  }
}
