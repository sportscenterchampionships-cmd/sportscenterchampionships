import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SportCenter, SportCenterZone, SportsCenterFilter } from '../../models/app.interface';

const MOCK_CENTERS: SportCenter[] = [
  {
    id: 1,
    name: 'Sports Center Norte',
    google_maps_url: 'https://maps.google.com/?q=Sports+Center+Norte',
    address: 'Av. del Deporte 1',
    city: 'Madrid',
    phone: '+34 600 111 111',
    website: 'https://norte.example.com',
  },
  {
    id: 2,
    name: 'Polideportivo Central',
    google_maps_url: 'https://maps.google.com/?q=Polideportivo+Central',
    address: 'C/ Mayor 22',
    city: 'Madrid',
    phone: '+34 600 222 222',
    website: 'https://central.example.com',
  },
  {
    id: 3,
    name: 'Club Deportivo Costa',
    google_maps_url: 'https://maps.google.com/?q=Club+Deportivo+Costa',
    address: 'Paseo Marítimo s/n',
    city: 'Valencia',
    phone: '+34 600 333 333',
    website: 'https://costa.example.com',
  },
];

const MOCK_ZONES: SportCenterZone[] = [
  { id: 11, sport_center_id: 1, name: 'Pista 1', type: 'exterior' },
  { id: 12, sport_center_id: 1, name: 'Pista 2', type: 'cubierta' },
  { id: 21, sport_center_id: 2, name: 'Pabellón A', type: 'cubierta' },
  { id: 22, sport_center_id: 2, name: 'Campo F11', type: 'exterior' },
  { id: 31, sport_center_id: 3, name: 'Pista Central', type: 'exterior' },
];

@Injectable({ providedIn: 'root' })
export class SportsCenterService {
  getCenters(filter?: SportsCenterFilter): Observable<SportCenter[]> {
    return of(MOCK_CENTERS).pipe(
      map((list) => {
        if (!filter) return list;
        const q = (filter.q || '').toLowerCase().trim();
        const city = (filter.city || '').toLowerCase().trim();
        return list.filter((c) => {
          const matchesQ = !q ||
            c.name.toLowerCase().includes(q) ||
            c.address.toLowerCase().includes(q);
          const matchesCity = !city || c.city.toLowerCase().includes(city);
          return matchesQ && matchesCity;
        });
      })
    );
  }

  getZonesByCenter(centerId: number): Observable<SportCenterZone[]> {
    return of(MOCK_ZONES.filter((z) => z.sport_center_id === centerId));
  }
}
