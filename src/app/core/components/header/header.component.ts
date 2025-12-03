import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateFiltersService } from '../../../homepage-templates/services/template-filters.service';
import { TemplateService } from '../../../homepage-templates/services/template.service';
import { TemplateDialogComponent } from '../../../homepage-templates/components/template-dialog/template-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private readonly filtersService: TemplateFiltersService,
    private readonly dialog: MatDialog,
    private readonly templateService: TemplateService
  ) {}

  onSearch(term: string): void {
    this.filtersService.updateFilters({ search: term });
  }

  onSortChange(sort: 'recent' | 'name'): void {
    this.filtersService.updateFilters({ sort });
  }

  openCreateTemplate(): void {
    const dialogRef = this.dialog.open(TemplateDialogComponent, {
      width: '520px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.templateService.addTemplate(result);
      }
    });
  }
}
