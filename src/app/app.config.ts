import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

import { provideTranslateService, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { translateHttpLoader } from './translate.config';
import { layoutFeature } from '@layout/store/layout.reducer';
import { LayoutEffects } from '@layout/store/layout.effects';
import { LanguageEnum } from '@shared/enums/language.enums';
import { getLanguageCode } from '@shared/constants/language.constants';

function initializeTranslationFactory() {
  return (): Promise<void> => {
    const translate = inject(TranslateService);
    const langCode = getLanguageCode(LanguageEnum.ENGLISH);
    translate.setDefaultLang(langCode);
    return translate.use(langCode).toPromise().catch(() => {
      console.warn('Falha ao carregar traduções durante o prerender');
    }).then(() => {});
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoader,
        deps: [HttpClient],
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslationFactory,
      multi: true,
    },
    provideStore({ [layoutFeature.name]: layoutFeature.reducer }),
    provideEffects([LayoutEffects]),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslationFactory,
      multi: true,
    },
  ]
};
