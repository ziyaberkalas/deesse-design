import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormField, form, minLength, required, email as emailValidator } from '@angular/forms/signals';
import { AuthService } from '../../../core/services/auth.service';
import { isSupabaseConfigured } from '../../../core/config/supabase-config';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormField],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly t = inject(LanguageService).t;
  protected readonly configured = isSupabaseConfigured();
  protected readonly submitting = signal(false);
  protected readonly serverError = signal<string | null>(null);
  /** E-posta onayı açıksa giriş yapılamaz; kullanıcıya postasını kontrol etmesi söylenir. */
  protected readonly needsEmailConfirmation = signal(false);

  protected readonly model = signal({ displayName: '', phone: '', email: '', password: '' });
  // Mesajlar fonksiyon: dil değiştiğinde yeniden hesaplansınlar diye (bkz. login.ts).
  protected readonly signupForm = form(this.model, (schema) => {
    required(schema.displayName, { message: () => this.t().auth.nameRequired });
    required(schema.phone, { message: () => this.t().auth.phoneRequired });
    required(schema.email, { message: () => this.t().auth.emailRequired });
    emailValidator(schema.email, { message: () => this.t().auth.emailInvalid });
    required(schema.password, { message: () => this.t().auth.passwordChoose });
    minLength(schema.password, 6, { message: () => this.t().auth.passwordMinLength });
  });

  protected readonly canSubmit = computed(() => !this.submitting() && this.signupForm().valid());

  protected async onSubmit(): Promise<void> {
    if (!this.canSubmit()) {
      return;
    }
    this.submitting.set(true);
    this.serverError.set(null);

    const { displayName, phone, email, password } = this.model();
    const { error } = await this.auth.signUp(email, password, displayName, phone);

    this.submitting.set(false);
    if (error) {
      this.serverError.set(error);
      return;
    }

    // E-posta onayı kapalıysa signUp oturumu doğrudan açar; açıksa oturum yoktur.
    if (this.auth.isLoggedIn()) {
      await this.router.navigateByUrl('/hesabim');
    } else {
      this.needsEmailConfirmation.set(true);
    }
  }
}
