import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SportCenter, SportCenterZone, SportsCenterFilter } from '../../models/app.interface';
import { SportsCenterService } from '../../services/sports-center/sports-center.service';

@Component({
  selector: 'app-sport-center',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
<section class="sport-center-selector container py-2">
  <div class="d-flex align-items-center justify-content-between mb-2">
    <h3 class="m-0">Seleccionar centro</h3>
    <button type="button" class="btn btn-sm btn-outline-primary" (click)="goToCreateCenter()">
      + Crear centro
    </button>
  </div>

  <form class="row g-2 mb-3" (ngSubmit)="onSearch()">
    <div class="col-12 col-md-6">
      <input
        class="form-control"
        type="search"
        [(ngModel)]="filter.q"
        name="q"
        placeholder="Buscar por nombre o dirección"
      />
    </div>
    <div class="col-8 col-md-4">
      <input
        class="form-control"
        type="text"
        [(ngModel)]="filter.city"
        name="city"
        placeholder="Ciudad"
      />
    </div>
    <div class="col-4 col-md-2 d-grid">
      <button class="btn btn-primary" type="submit" [disabled]="loadingCenters">Buscar</button>
    </div>
  </form>

  <div *ngIf="loadingCenters" class="alert alert-info">Cargando centros...</div>

  <div class="row">
    <div class="col-12 col-md-6 mb-3">
      <label class="form-label">Centros</label>
      <select class="form-select" [(ngModel)]="selectedCenterId" name="center" (ngModelChange)="onCenterChange($event)">
        <option [ngValue]="undefined">-- Selecciona un centro --</option>
        <option *ngFor="let c of centers" [ngValue]="c.id">{{ c.name }} ({{ c.city }})</option>
      </select>
      <small class="text-muted d-block mt-1" *ngIf="selectedCenterId">
        <a [href]="selectedCenter?.google_maps_url" target="_blank" rel="noopener">Ver en Google Maps</a>
      </small>
    </div>

    <div class="col-12 col-md-6 mb-3" *ngIf="showZone">
      <label class="form-label">Zonas</label>
      <div *ngIf="loadingZones" class="alert alert-info py-1">Cargando zonas...</div>
      <select class="form-select" [(ngModel)]="selectedZoneId" name="zone" (ngModelChange)="onZoneChange($event)" [disabled]="!selectedCenterId || loadingZones">
        <option [ngValue]="undefined">-- Selecciona una zona --</option>
        <option *ngFor="let z of zones" [ngValue]="z.id">{{ z.name }}<span *ngIf="z.type"> ({{ z.type }})</span></option>
      </select>
    </div>
  </div>

  <div class="d-flex gap-2">
    <button class="btn btn-success" type="button" (click)="confirmSelection()" [disabled]="!selectedCenterId">
      Confirmar selección
    </button>
    <a class="btn btn-outline-secondary" [routerLink]="['/sports-center']">Crear centro</a>
  </div>
</section>
`,
  styles: [
    `
    .sport-center-selector { }
    `,
  ],
})
export class SportCenterComponent implements OnInit {
  @Input() showZone = true;
  @Input() initialCenterId?: number;
  @Input() initialZoneId?: number;

  @Output() centerSelected = new EventEmitter<SportCenter>();
  @Output() zoneSelected = new EventEmitter<SportCenterZone | null>();
  @Output() selected = new EventEmitter<{ center: SportCenter; zone: SportCenterZone | null }>();

  centers: SportCenter[] = [];
  zones: SportCenterZone[] = [];

  filter: SportsCenterFilter = { q: '', city: '' };
  selectedCenterId?: number;
  selectedZoneId?: number;

  loadingCenters = false;
  loadingZones = false;

  constructor(private svc: SportsCenterService, private router: Router) {}

  get selectedCenter(): SportCenter | undefined {
    return this.centers.find((c) => c.id === this.selectedCenterId);
  }

  ngOnInit(): void {
    this.loadCenters();
  }

  loadCenters() {
    this.loadingCenters = true;
    this.svc.getCenters(this.filter).subscribe({
      next: (list) => {
        this.centers = list;
        if (this.initialCenterId && list.some((c) => c.id === this.initialCenterId)) {
          this.selectedCenterId = this.initialCenterId;
          this.onCenterChange(this.selectedCenterId);
        }
      },
      complete: () => (this.loadingCenters = false),
    });
  }

  onSearch() {
    this.loadCenters();
  }

  onCenterChange(centerId?: number) {
    if (!centerId) {
      this.zones = [];
      this.selectedZoneId = undefined;
      this.zoneSelected.emit(null);
      return;
    }
    const center = this.centers.find((c) => c.id === centerId);
    if (center) this.centerSelected.emit(center);

    if (this.showZone) {
      this.loadingZones = true;
      this.svc.getZonesByCenter(centerId).subscribe({
        next: (zs) => {
          this.zones = zs;
          if (this.initialZoneId && zs.some((z) => z.id === this.initialZoneId)) {
            this.selectedZoneId = this.initialZoneId;
            this.onZoneChange(this.selectedZoneId);
          }
        },
        complete: () => (this.loadingZones = false),
      });
    }
  }

  onZoneChange(zoneId?: number) {
    if (zoneId == null) {
      this.zoneSelected.emit(null);
      return;
    }
    const zone = this.zones.find((z) => z.id === zoneId) || null;
    this.zoneSelected.emit(zone);
  }

  confirmSelection() {
    const center = this.centers.find((c) => c.id === this.selectedCenterId);
    const zone = this.showZone ? this.zones.find((z) => z.id === this.selectedZoneId) || null : null;
    if (center) this.selected.emit({ center, zone });
  }

  goToCreateCenter() {
    this.router.navigateByUrl('/sports-center');
  }
}
