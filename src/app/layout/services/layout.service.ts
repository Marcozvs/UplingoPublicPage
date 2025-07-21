import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly storageKey = 'theme';

  constructor(private readonly translate: TranslateService) {}

  applyTheme(theme: 'dark' | 'light'): void {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    sessionStorage.setItem(this.storageKey, theme);

    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).initFlowbite) {
        (window as any).initFlowbite();
      }
    }, 50);
  }

  loadStoredTheme(): 'dark' | 'light' | null {
    const theme = sessionStorage.getItem(this.storageKey);
    return theme === 'dark' || theme === 'light' ? theme : null;
  }
}
