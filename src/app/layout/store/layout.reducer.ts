import { createFeature, createReducer, on } from '@ngrx/store';

import { LayoutState } from '@layout/store/layout.interface';
import { layoutActions } from '@layout/store//layout.actions';
import { LanguageEnum } from '@shared/enums/language.enums';

export const layoutInitialState: LayoutState = {
  language: LanguageEnum.ENGLISH,
  darkMode: false,
};

export const layoutFeature = createFeature({
  name: 'layout',
  reducer: createReducer(
    layoutInitialState,
    on(layoutActions.setData, (state, { data }) => ({ ...state, ...data })),
    on(layoutActions.toggleTheme, state => ({ ...state, darkMode: !state.darkMode })),
  ),
});
