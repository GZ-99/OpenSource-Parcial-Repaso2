import { Component, ChangeDetectionStrategy } from '@angular/core';
import {inject, signal} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
  private translate = inject(TranslateService);
  protected currentLang = signal<string>(this.translate.getCurrentLang() || 'en');

  /** List of available language codes */
  protected languages: string[] = ['en', 'es'];

  /**
    * Changes the application's current language.
    * Updates both the translation service and the component's local state.
    *
    * @param language - The language code to switch to (e.g., 'en', 'es')
    */
  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLang.set(language);
  }
}
