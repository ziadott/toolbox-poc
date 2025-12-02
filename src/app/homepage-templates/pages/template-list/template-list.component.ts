import { Component, OnInit } from '@angular/core';
import { Template } from '../../models/template.model';
import { TemplateService } from '../../services/template.service';
import { TemplateFiltersService, TemplateFilterState, SortOption } from '../../services/template-filters.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
  templates: Template[] = [];
  private allTemplates: Template[] = [];
  totalTemplates = 0;
  readonly pageSize = 6;
  currentPage = 1;

  constructor(
    private readonly templateService: TemplateService,
    private readonly filtersService: TemplateFiltersService
  ) {}

  ngOnInit(): void {
    this.allTemplates = this.templateService.getTemplates();
    this.totalTemplates = this.templateService.getTotal();
    this.templates = [...this.allTemplates];

    this.filtersService.filtersChanges().subscribe((filters) => {
      this.applyFilters(filters);
    });
  }

  get rangeText(): string {
    if (!this.templates.length) {
      return '0';
    }

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.templates.length - 1, this.totalTemplates);

    return `${start}-${end}`;
  }

  get totalPages(): number {
    return Math.ceil(this.totalTemplates / this.pageSize);
  }

  private applyFilters(filters: TemplateFilterState): void {
    let list = [...this.allTemplates];

    if (!filters.showArchived) {
      list = list.filter((t) => t.status !== 'Archived');
    }

    if (filters.status) {
      list = list.filter((t) => t.status === filters.status);
    }

    if (filters.search.trim()) {
      const term = filters.search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.description.toLowerCase().includes(term)
      );
    }

    list = this.applySort(list, filters.sort);

    this.templates = list;
    this.totalTemplates = list.length;
    this.currentPage = 1;
  }

  private applySort(list: Template[], sort: SortOption): Template[] {
    const byDate = (value: string) => new Date(value.replace(' ', 'T'));

    switch (sort) {
      case 'name':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case 'status':
        return [...list].sort((a, b) => a.status.localeCompare(b.status));
      case 'recent':
      default:
        return [...list].sort(
          (a, b) => byDate(b.lastModified).getTime() - byDate(a.lastModified).getTime()
        );
    }
  }
}
