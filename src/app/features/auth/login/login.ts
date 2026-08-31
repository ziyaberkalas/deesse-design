import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormField, form, required, email as emailValidator } from '@angular/forms/signals';
import { AuthService } from '../../../core/services/auth.service';
import { isSupabaseConfigured } from '../../../core/config/supabase-config';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  /**
   * Giriş sonrası dönülecek adres — authGuard yönlendirirken ?redirect= ile ekler.
   * withComponentInputBinding() sayesinde query param doğrudan bu input'a bağlanır.
   */
  readonly redirect = input<string | undefined>(undefined);

  protected readonly configured = isSupabaseConfigured();
  protected readonly submitting = signal(false);
  protected readonly serverError = signal<string | null>(null);

  protected readonly model = signal({ email: '', password: '' });
  protected readonly loginForm = form(this.model, (schema) => {
    required(schema.email, { message: 'E-posta adresinizi girin' });
    emailValidator(schema.email, { message: 'Geçerli bir e-posta adresi girin' });
    required(schema.password, { message: 'Şifrenizi girin' });
  });

  protected readonly canSubmit = computed(() => !this.submitting() && this.loginForm().valid());

  protected async onSubmit(): Promise<void> {
    if (!this.canSubmit()) {
      return;
    }
    this.submitting.set(true);
    this.serverError.set(null);

    const { email, password } = this.model();
    const { error } = await this.auth.signIn(email, password);

    this.submitting.set(false);
    if (error) {
      this.serverError.set(error);
      return;
    }
    await this.router.navigateByUrl(this.redirect() ?? '/hesabim');
  }
}
