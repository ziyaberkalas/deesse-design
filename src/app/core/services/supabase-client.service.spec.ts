import { TestBed } from '@angular/core/testing';
import { SupabaseClientService } from './supabase-client.service';

describe('SupabaseClientService', () => {
  let service: SupabaseClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseClientService);
  });

  it('istemciyi yalnızca bir kez oluşturur (aynı promise döner)', () => {
    const first = service.getClient();
    const second = service.getClient();
    expect(first).toBe(second);
  });

  it('auth ve from metodları olan bir istemci döndürür', async () => {
    const client = await service.getClient();
    expect(typeof client.auth.signInWithPassword).toBe('function');
    expect(typeof client.from).toBe('function');
  });
});
