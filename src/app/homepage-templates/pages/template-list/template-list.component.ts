import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Template } from '../../models/template.model';
import { TemplateService } from '../../services/template.service';
import { TemplateFiltersService, TemplateFilterState, SortOption } from '../../services/template-filters.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit, OnDestroy {
  templates: Template[] = [];
  private allTemplates: Template[] = [];
  totalTemplates = 0;
  readonly pageSize = 6;
  currentPage = 1;
  private subscriptions: Subscription[] = [];
  private currentFilters: TemplateFilterState = {
    search: '',
    sort: 'recent',
    showArchived: false
  };

  constructor(
    private readonly templateService: TemplateService,
    private readonly filtersService: TemplateFiltersService
  ) {}

  ngOnInit(): void {
    this.allTemplates = this.templateService.getTemplates();
    this.totalTemplates = this.allTemplates.length;
    this.applyFilters(this.currentFilters);

    this.subscriptions.push(
      this.templateService.templatesChanges().subscribe((templates) => {
        this.allTemplates = templates;
        this.totalTemplates = templates.length;
        this.applyFilters(this.currentFilters);
      })
    );

    this.subscriptions.push(
      this.filtersService.filtersChanges().subscribe((filters) => {
        this.currentFilters = filters;
        this.applyFilters(filters);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
      case 'recent':
      default:
        return [...list].sort(
          (a, b) => byDate(b.lastModified).getTime() - byDate(a.lastModified).getTime()
        );
    }
  }
}
