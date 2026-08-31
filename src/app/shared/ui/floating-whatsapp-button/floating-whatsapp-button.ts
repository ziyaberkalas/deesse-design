import { Component, computed, inject } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { MobileMenuStateService } from '../../layout/mobile-menu-state.service';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-floating-whatsapp-button',
  templateUrl: './floating-whatsapp-button.html',
  styleUrl: './floating-whatsapp-button.css',
})
export class FloatingWhatsappButton {
  private readonly whatsapp = inject(WhatsappService);
  private readonly menuState = inject(MobileMenuStateService);

  protected readonly t = inject(LanguageService).t;

  // Sinyal: hazır mesaj dile bağlı olduğu için dil değişince bağlantı da yenilenmeli.
  protected readonly href = computed(() => this.whatsapp.buildGeneralInquiryLink());
  protected readonly navOpen = this.menuState.open;
}
