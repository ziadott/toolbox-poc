import { Component, Input } from '@angular/core';
import { Template } from '../../models/template.model';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss']
})
export class TemplateCardComponent {
  @Input() template!: Template;
}
