import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateListComponent } from './pages/template-list/template-list.component';
import { TemplateEditorComponent } from './pages/template-editor/template-editor.component';

const routes: Routes = [
  { path: '', component: TemplateListComponent },
  { path: 'editor/:id', component: TemplateEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageTemplatesRoutingModule {}
