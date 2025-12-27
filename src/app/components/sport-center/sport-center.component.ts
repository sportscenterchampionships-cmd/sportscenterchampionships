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
  templateUrl: './sport-center.component.html',
  styleUrls: ['./sport-center.component.css'],
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
