import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateListComponent } from './pages/template-list/template-list.component';

const routes: Routes = [
  { path: '', component: TemplateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageTemplatesRoutingModule {}
