import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageTemplatesRoutingModule } from './homepage-templates-routing.module';

import { TemplateListComponent } from './pages/template-list/template-list.component';
import { TemplateCardComponent } from './components/template-card/template-card.component';
import { TemplateEditorComponent } from './pages/template-editor/template-editor.component';
import { AddSectionDialogComponent } from './components/add-section-dialog/add-section-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TemplateListComponent,
    TemplateCardComponent,
    TemplateEditorComponent,
    AddSectionDialogComponent
  ],
  imports: [
    CommonModule,
    HomepageTemplatesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class HomepageTemplatesModule {}
