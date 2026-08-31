import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './shared/layout/site-header/site-header';
import { SiteFooter } from './shared/layout/site-footer/site-footer';
import { FloatingWhatsappButton } from './shared/ui/floating-whatsapp-button/floating-whatsapp-button';
import { LanguageService } from './core/i18n/language.service';

@Component({
  imports: [RouterOutlet, SiteHeader, SiteFooter, FloatingWhatsappButton],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly t = inject(LanguageService).t;
}
