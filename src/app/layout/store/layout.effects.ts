import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, tap, withLatestFrom } from 'rxjs/operators';

import { layoutActions } from '@layout/store/layout.actions';
import { layoutSelector } from '@layout/store/layout.selector';
import { getLanguageCode } from '@shared/constants/language.constants';
import { LayoutService } from '@layout/services/layout.service';

@Injectable()
export class LayoutEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly store: Store = inject(Store);
  private readonly layoutService: LayoutService = inject(LayoutService);

  languageEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(layoutActions.setData),
        withLatestFrom(this.store.select(layoutSelector.selectLanguage)),
        tap(([action, lang]) => {
          if (action.data.language !== undefined) {
            const code = getLanguageCode(action.data.language);
            sessionStorage.setItem('app-language', code);
          }
        })
      ),
    { dispatch: false }
  );

  toggleThemeEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(layoutActions.toggleTheme),
        tap(() => {
          this.store
            .select(layoutSelector.selectDarkMode)
            .pipe(take(1))
            .subscribe((isDark) => {
              const theme = isDark ? 'dark' : 'light';
              this.layoutService.applyTheme(theme);
            });
        })
      ),
    { dispatch: false }
  );
}
