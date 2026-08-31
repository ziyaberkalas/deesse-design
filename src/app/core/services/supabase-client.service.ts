import { Service } from '@angular/core';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../config/supabase-config';

/**
 * Supabase istemcisini tek bir yerde, TEMBEL olarak kurar.
 *
 * Neden dinamik import: AuthService header tarafından enjekte edildiği için uygulama açılışında
 * oluşur. Statik import kullanılsaydı ~162kB'lık SDK doğrudan initial bundle'a girer ve
 * angular.json'daki 500kB bütçesini aşardı (ölçüldü: 528kB). Dinamik import ile SDK ayrı bir
 * chunk'a taşınır; ilk boyama engellenmez, paralel yüklenir.
 *
 * Sadece tip importu (`import type`) derlemede silinir, bundle'a etki etmez.
 *
 * Ayrıca bu servis, testlerde gerçek ağ çağrısını engellemek için tek DI dikişidir.
 */
@Service()
export class SupabaseClientService {
  private clientPromise: Promise<SupabaseClient> | null = null;

  getClient(): Promise<SupabaseClient> {
    this.clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey),
    );
    return this.clientPromise;
  }
}
