import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppNotification } from '../../models/notification.interface';
import { NotificationComponent } from '../components/notification/notification.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, NotificationComponent, BackButtonComponent],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  notifications: AppNotification[] = [
    { id: 1, title: 'Partido programado', description: 'Tienes un partido el 28 de enero a las 19:00', createdAt: new Date().toISOString(), type: 'info' },
    { id: 2, title: 'Nuevo mensaje', description: 'Tu capitán ha actualizado la alineación', createdAt: new Date(Date.now() - 3600_000).toISOString(), type: 'success' },
    { id: 3, title: 'Resultado pendiente', description: 'Recuerda reportar el resultado del último partido', createdAt: new Date(Date.now() - 86_400_000).toISOString(), type: 'warning' },
  ];

  onDelete(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }

  trackById = (_: number, item: AppNotification) => item.id;
}
