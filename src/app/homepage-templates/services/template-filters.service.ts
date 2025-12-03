import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export type SortOption = 'recent' | 'name';

export interface TemplateFilterState {
  search: string;
  sort: SortOption;
  showArchived: boolean;
}

const DEFAULT_FILTER_STATE: TemplateFilterState = {
  search: '',
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
