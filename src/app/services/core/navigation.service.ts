import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private stack: string[] = [];
  private readonly max = 50;

  constructor(private router: Router, private location: Location) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects;
        const last = this.stack[this.stack.length - 1];
        if (last !== url) {
          this.stack.push(url);
          if (this.stack.length > this.max) this.stack.shift();
        }
      });
  }

  canGoBack(): boolean {
    return this.stack.length > 1;
  }

  getPreviousUrl(): string | null {
    if (this.stack.length > 1) {
      return this.stack[this.stack.length - 2];
    }
    return null;
  }

  goBack(fallback?: string) {
    if (this.canGoBack()) {
      this.location.back();
    } else if (fallback) {
      this.router.navigateByUrl(fallback);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  getRouteFallback(route: ActivatedRoute): string | undefined {
    const data = route.snapshot.data as { backTo?: string };
    return data?.backTo;
  }
}
