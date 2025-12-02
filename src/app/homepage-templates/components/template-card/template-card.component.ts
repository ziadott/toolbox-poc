import { Component, Input } from '@angular/core';
import { Template, TemplateStatus, UserType } from '../../models/template.model';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss']
})
export class TemplateCardComponent {
  @Input() template!: Template;

  private readonly statusLabels: Record<TemplateStatus, string> = {
    Draft: 'Draft',
    Active: 'Active',
    PublishedToStaging: 'Published to Staging',
    PublishedToProduction: 'Published to Production',
    Archived: 'Archived'
  };

  getStatusLabel(status: TemplateStatus): string {
    return this.statusLabels[status];
  }

  getStatusClass(status: TemplateStatus): string {
    switch (status) {
      case 'PublishedToProduction':
        return 'status--success';
      case 'PublishedToStaging':
        return 'status--warning';
      case 'Active':
        return 'status--active';
      case 'Draft':
        return 'status--draft';
      case 'Archived':
      default:
        return 'status--archived';
    }
  }

  getUserTypeClass(userType: UserType): string {
    switch (userType) {
      case 'Premium':
        return 'type--premium';
      case 'Freemium':
        return 'type--freemium';
      default:
        return 'type--both';
    }
  }
}
