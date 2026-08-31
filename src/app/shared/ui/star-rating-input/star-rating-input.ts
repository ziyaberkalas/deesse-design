import { Component, input, model } from '@angular/core';

/**
 * Puan seçme kontrolü. Mevcut StarRating salt-okunurdur (role="img"), seçim için kullanılamaz.
 *
 * Native <fieldset> + <input type="radio"> üzerine kurulu: klavye gezinmesi (ok tuşları),
 * grup semantiği ve ekran okuyucu desteği tarayıcıdan bedava gelir — özel bir
 * role="radiogroup" widget'ı elle yazmaya göre çok daha düşük erişilebilirlik riski.
 */
@Component({
  selector: 'app-star-rating-input',
  templateUrl: './star-rating-input.html',
  styleUrl: './star-rating-input.css',
})
export class StarRatingInput {
  readonly rating = model<number>(0);
  readonly legend = input<string>('Puanınız');
  /** Aynı sayfada birden fazla grup olursa radio name'lerinin çakışmaması için. */
  readonly name = input<string>('rating');

  protected readonly stars = [1, 2, 3, 4, 5] as const;

  protected select(value: number): void {
    this.rating.set(value);
  }
}
