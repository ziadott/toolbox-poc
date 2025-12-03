import { Component } from '@angular/core';
import { TemplateFiltersService } from '../../../homepage-templates/services/template-filters.service';

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

  onSortChange(sort: 'recent' | 'name'): void {
    this.filtersService.updateFilters({ sort });
  }
}
