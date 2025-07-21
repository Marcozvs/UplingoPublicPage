import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef, inject } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LayoutFacade } from '@layout/store/layout.facade';
import { getLanguageCode, LANGUAGE_OPTIONS } from '@shared/constants/language.constants';
import { LanguageEnum } from '@shared/enums/language.enums';
import { IOption } from '@shared/interfaces/option.interfaces';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
})
export class Header {
  private readonly eRef: ElementRef = inject(ElementRef);
  private readonly layoutFacade = inject(LayoutFacade);
  private readonly translate = inject(TranslateService);

  isLanguageMenuOpen = false;
  languageOptions: IOption<LanguageEnum>[] = LANGUAGE_OPTIONS;

  darkMode$: Observable<boolean> = this.layoutFacade.darkMode$;

  handleToggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  handleSelectLanguage(lang: LanguageEnum) {
    const langCode = getLanguageCode(lang);
    this.translate.use(langCode);
    this.layoutFacade.setLanguage(lang);
    this.isLanguageMenuOpen = false;
  }

  handleToggleTheme() {
    this.layoutFacade.toggleDarkMode();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isLanguageMenuOpen = false;
    }
  }
}
