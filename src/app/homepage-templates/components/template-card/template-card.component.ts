import { Component, Input } from '@angular/core';
import { Template } from '../../models/template.model';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss']
})
export class TemplateCardComponent {
  @Input() template!: Template;

  constructor(private readonly templateService: TemplateService) {}

  deleteTemplate(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.templateService.deleteTemplate(this.template.id);
  }
}
