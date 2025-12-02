import { Component } from '@angular/core';
import { TemplateFiltersService } from '../../../homepage-templates/services/template-filters.service';
import { TemplateStatus } from '../../../homepage-templates/models/template.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private readonly filtersService: TemplateFiltersService) {}

  onSearch(term: string): void {
    this.filtersService.updateFilters({ search: term });
  }

  onStatusChange(status: TemplateStatus | ''): void {
    this.filtersService.updateFilters({ status });
  }

  onSortChange(sort: 'recent' | 'name' | 'status'): void {
    this.filtersService.updateFilters({ sort });
  }

  onShowArchivedChange(showArchived: boolean): void {
    this.filtersService.updateFilters({ showArchived });
  }
}
