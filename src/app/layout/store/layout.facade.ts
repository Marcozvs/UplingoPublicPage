import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { layoutSelector } from '@layout/store/layout.selector';
import { LayoutState } from '@layout/store/layout.interface';
import { layoutActions } from '@layout/store/layout.actions';
import { getLanguageCode } from '@shared/constants/language.constants';
import { LanguageEnum } from '@shared/enums/language.enums';

@Injectable({
  providedIn: 'root',
})
export class LayoutFacade {
  private readonly store: Store = inject(Store);

  readonly layoutState$: Observable<LayoutState> = this.store.select(
    layoutSelector.selectLayoutState
  );

  readonly darkMode$: Observable<boolean> = this.store.select(
    layoutSelector.selectDarkMode
  );

  setLayoutData(data: Partial<LayoutState>): void {
    this.store.dispatch(layoutActions.setData({ data }));
  }

  setLanguage(language: LanguageEnum): void {
    sessionStorage.setItem('app-language', getLanguageCode(language));
    this.setLayoutData({ language });
  }

  toggleDarkMode(): void {
    this.store.dispatch(layoutActions.toggleTheme());
  }
}
