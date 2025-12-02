import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'homepage-templates',
    loadChildren: () =>
      import('./homepage-templates/homepage-templates.module')
        .then(m => m.HomepageTemplatesModule)
  },
  { path: '', redirectTo: 'homepage-templates', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
