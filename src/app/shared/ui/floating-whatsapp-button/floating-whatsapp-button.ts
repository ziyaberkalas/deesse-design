import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { MobileMenuStateService } from '../../layout/mobile-menu-state.service';

@Component({
  selector: 'app-floating-whatsapp-button',
  templateUrl: './floating-whatsapp-button.html',
  styleUrl: './floating-whatsapp-button.css',
})
export class FloatingWhatsappButton {
  private readonly whatsapp = inject(WhatsappService);
  private readonly menuState = inject(MobileMenuStateService);

  protected readonly href = this.whatsapp.buildGeneralInquiryLink();
  protected readonly navOpen = this.menuState.open;
}
