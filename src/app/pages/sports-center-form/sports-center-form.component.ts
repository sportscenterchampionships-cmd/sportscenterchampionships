import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SportCenter } from '../../models/app.interface';

@Component({
  selector: 'app-sports-center-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sports-center-form.component.html',
  styleUrls: ['./sports-center-form.component.css'],
})
export class SportsCenterFormComponent {
  center: SportCenter = {
    name: '',
    google_maps_url: '',
    address: '',
    city: '',
    phone: '',
    website: '',
  };

  submit() {
    console.log('Centro deportivo:', this.center);

    // Aquí luego llamaremos a Supabase
    // this.supabase.from('sports_centers').insert(...)
  }
}
