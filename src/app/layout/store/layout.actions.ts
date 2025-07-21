import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LayoutState } from './layout.interface';

export const layoutActions = createActionGroup({
  source: 'Layout',
  events: {
    setData: props<{ data: Partial<LayoutState> }>(),
    toggleTheme: emptyProps(),
  },
});
