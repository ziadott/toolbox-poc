import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TemplateStatus } from '../models/template.model';

export type SortOption = 'recent' | 'name' | 'status';

export interface TemplateFilterState {
  search: string;
  status: TemplateStatus | '';
  sort: SortOption;
  showArchived: boolean;
}

const DEFAULT_FILTER_STATE: TemplateFilterState = {
  search: '',
  status: '',
  sort: 'recent',
  showArchived: false
};

@Injectable({ providedIn: 'root' })
export class TemplateFiltersService {
  private readonly filterState$ = new BehaviorSubject<TemplateFilterState>(DEFAULT_FILTER_STATE);

  filtersChanges() {
    return this.filterState$.asObservable();
  }

  updateFilters(partial: Partial<TemplateFilterState>): void {
    const next = { ...this.filterState$.value, ...partial };
    this.filterState$.next(next);
  }
}
