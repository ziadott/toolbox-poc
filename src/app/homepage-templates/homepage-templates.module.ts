import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageTemplatesRoutingModule } from './homepage-templates-routing.module';

import { TemplateListComponent } from './pages/template-list/template-list.component';
import { TemplateCardComponent } from './components/template-card/template-card.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TemplateListComponent,
    TemplateCardComponent
  ],
  imports: [
    CommonModule,
    HomepageTemplatesRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class HomepageTemplatesModule {}
