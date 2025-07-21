import { layoutFeature } from "@layout/store/layout.reducer";

export const {
  selectLayoutState,
  selectLanguage,
  selectDarkMode,
} = layoutFeature;

export const layoutSelector = {
  selectLayoutState,
  selectLanguage,
  selectDarkMode,
};

