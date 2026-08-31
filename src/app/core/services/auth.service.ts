import { Service, computed, inject, signal } from '@angular/core';
import type { User } from '@supabase/supabase-js';
import { SupabaseClientService } from './supabase-client.service';
import { Profile } from '../models/supabase.model';

@Service()
export class AuthService {
  private readonly supabase = inject(SupabaseClientService);

  private readonly _currentUser = signal<User | null>(null);
  private readonly _profile = signal<Profile | null>(null);
  private readonly _ready = signal(false);

  private resolveReady!: () => void;
  private readonly readyPromise = new Promise<void>((resolve) => {
    this.resolveReady = resolve;
  });

  readonly currentUser = this._currentUser.asReadonly();
  readonly profile = this._profile.asReadonly();
  /** İlk oturum + profil sorgusu tamamlandı mı? Header'ın yanlış durum göstermesini önler. */
  readonly ready = this._ready.asReadonly();

  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly isAdmin = computed(() => this._profile()?.is_admin ?? false);
  readonly displayName = computed(() => this._profile()?.display_name ?? this._currentUser()?.email ?? '');

  constructor() {
    void this.init();

    // Emniyet supabası: ready guard'ların navigasyonunu beklettiği için, Supabase yapılandırılmamışsa
    // ya da ağ/DNS takılırsa sayfanın süresiz boş kalmaması adına en geç 5sn'de serbest bırakılır.
    // Oturum geri yüklenemediyse kullanıcı zaten çıkış yapmış sayılır — güvenli varsayılan.
    setTimeout(() => this.markReady(), 5000);
  }

  private async init(): Promise<void> {
    try {
      const client = await this.supabase.getClient();
      // onAuthStateChange abone olur olmaz INITIAL_SESSION olayıyla bir kez tetiklenir
      // (localStorage'dan geri yüklenen oturumla), bu yüzden ayrıca getSession() çağırmaya gerek yok.
      client.auth.onAuthStateChange(async (_event, session) => {
        const user = session?.user ?? null;
        this._currentUser.set(user);
        // Profil sorgusu ready'den ÖNCE beklenmeli: aksi halde adminGuard yarışıp gerçek bir
        // admin için isAdmin() === false okuyabilir.
        this._profile.set(user ? await this.fetchProfile(user.id) : null);
        this.markReady();
      });
    } catch {
      // SDK chunk'ı yüklenemedi (ağ hatası): kullanıcı çıkış yapmış kabul edilir.
      this.markReady();
    }
  }

  /** Guard'lar karar vermeden önce bunu bekler. */
  whenReady(): Promise<void> {
    return this.readyPromise;
  }

  async signUp(
    email: string,
    password: string,
    displayName: string,
    phone: string,
  ): Promise<{ error: string | null }> {
    const client = await this.supabase.getClient();
    const { error } = await client.auth.signUp({
      email,
      password,
      // Bu meta veri auth.users.raw_user_meta_data'ya yazılır; handle_new_user() trigger'ı
      // oradan okuyup profiles satırını doldurur.
      options: { data: { display_name: displayName, phone } },
    });
    return { error: error?.message ?? null };
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const client = await this.supabase.getClient();
    const { error } = await client.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async signOut(): Promise<void> {
    const client = await this.supabase.getClient();
    await client.auth.signOut();
  }

  private async fetchProfile(userId: string): Promise<Profile | null> {
    try {
      const client = await this.supabase.getClient();
      const { data } = await client.from('profiles').select('*').eq('id', userId).maybeSingle<Profile>();
      return data ?? null;
    } catch {
      // Ağ hatası: kullanıcı giriş yapmış sayılır ama admin yetkisi doğrulanamaz (isAdmin false kalır).
      return null;
    }
  }

  private markReady(): void {
    if (!this._ready()) {
      this._ready.set(true);
      this.resolveReady();
    }
  }
}
