import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  query,
  stagger,
} from '@angular/animations';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-presentation',
  imports: [CommonModule, TranslateModule],
  templateUrl: './presentation.html',
  animations: [
    trigger('slideInUp', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(60px) scale(0.95)',
        filter: 'blur(3px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        filter: 'blur(0px)'
      })),
      transition('hidden => visible', animate('800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'))
    ]),

    trigger('fadeInScale', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('600ms ease-out'))
    ]),

    trigger('textFadeSlide', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('700ms 200ms ease-out'))
    ]),

    trigger('textFadeSlideRight', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(20px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', animate('700ms 400ms ease-out'))
    ]),

    trigger('iconPulse', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.7)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('600ms ease-out')),
      transition('visible <=> hidden', [
        animate('1200ms ease-in-out', style({ transform: 'scale(1.2)' })),
        animate('1200ms ease-in-out', style({ transform: 'scale(1)' })),
      ])
    ]),

    trigger('listStagger', [
      transition('hidden => visible', [
        query('a', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(150, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class Presentation implements AfterViewInit, OnDestroy {
  @ViewChild('firstBlock') firstBlock!: ElementRef;
  @ViewChild('aboutMeBlock') aboutMeBlock!: ElementRef;
  @ViewChild('starsCanvas', { static: true }) starsCanvas!: ElementRef<HTMLCanvasElement>;

  showFirstBlock = false;
  showAboutMeBlock = false;

  private observers: IntersectionObserver[] = [];
  private ctx!: CanvasRenderingContext2D;
  private stars: { x: number; y: number; size: number; speed: number; color: string }[] = [];
  private animationFrameId = 0;
  private platformId: Object = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.setupIntersectionObservers();
    this.initStars();
    this.animateStars();
    window.addEventListener('resize', this.resizeCanvas);
  }


  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.observers.forEach(observer => observer.disconnect());
    if (typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resizeCanvas);
  }


  private setupIntersectionObservers(): void {
    this.observeElement(this.firstBlock, () => this.showFirstBlock = true);
    this.observeElement(this.aboutMeBlock, () => this.showAboutMeBlock = true);
  }

  private observeElement(element: ElementRef, callback: () => void): void {
    if (typeof IntersectionObserver === 'undefined') {
      callback();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(element.nativeElement);
    this.observers.push(observer);
  }


  private initStars = (): void => {
    const canvas = this.starsCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();

    const colors = ['#d1d1d1', '#a0a0a0', '#808080', '#b0b0b0', '#e0e0e0'];
    const starCount = 100;
    this.stars = [];

    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  };

  private resizeCanvas = (): void => {
    const canvas = this.starsCanvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  private animateStars = (): void => {
    const canvas = this.starsCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of this.stars) {
      star.x -= star.speed;
      if (star.x < 0) {
        star.x = canvas.width;
        star.y = Math.random() * canvas.height;
      }
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.animationFrameId = requestAnimationFrame(this.animateStars);
  };

  handleOpenDocumentation(): void {
    window.open(
      'https://github.com/Marcozvs/Uplingo',
      '_blank'
    );
  }
}
