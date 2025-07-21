import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Header } from "@layout/components/header/header";
import { Footer } from "@layout/components/footer/footer";
import { LayoutService } from '@layout/services/layout.service';
import { Presentation } from "@pages/components/presentation/presentation";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, TranslateModule, Footer, Presentation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  private readonly translate = inject(TranslateService);
  private readonly layoutService = inject(LayoutService);
  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = sessionStorage.getItem('app-language');
      if (savedLang && savedLang !== this.translate.currentLang) {
        this.translate.use(savedLang);
      } else {
        sessionStorage.setItem('app-language', this.translate.currentLang || 'en');
      }
      const storedTheme = this.layoutService.loadStoredTheme();
      if (storedTheme) {
        this.layoutService.applyTheme(storedTheme);
      }
    }
  }
}
