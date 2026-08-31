import { TestBed } from '@angular/core/testing';
import { WhatsappService } from './whatsapp.service';
import { SITE_CONFIG } from '../config/site-config';

describe('WhatsappService', () => {
  let service: WhatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsappService);
  });

  it('varsayılan mesajla genel iletişim linki üretir', () => {
    const link = service.buildGeneralInquiryLink();
    expect(link.startsWith(`https://wa.me/${SITE_CONFIG.whatsapp.phoneE164}?text=`)).toBeTruthy();
  });

  it('özel mesajı URL-encode ederek ekler', () => {
    const link = service.buildGeneralInquiryLink('Elegance çantası hakkında bilgi');
    expect(link).toContain(encodeURIComponent('Elegance çantası hakkında bilgi'));
  });
});
