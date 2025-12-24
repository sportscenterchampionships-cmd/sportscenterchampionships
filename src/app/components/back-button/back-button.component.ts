import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/core/navigation.service';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent {
  @Input() label = 'Volver';
  @Input() iconOnly = false;
  @Input() fallbackUrl?: string;
  @Input() ariaLabel = 'Volver';

  constructor(private nav: NavigationService, private route: ActivatedRoute, private router: Router) {}

  onBack() {
    const fallback = this.fallbackUrl ?? this.nav.getRouteFallback(this.route) ?? '/';
    this.nav.goBack(fallback);
  }
}
