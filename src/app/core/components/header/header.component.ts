import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TemplateFiltersService } from '../../../homepage-templates/services/template-filters.service';
import { TemplateService } from '../../../homepage-templates/services/template.service';
import { TemplateDialogComponent } from '../../../homepage-templates/components/template-dialog/template-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isEditorPage = false;
  templateTitle = 'Template';
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly filtersService: TemplateFiltersService,
    private readonly dialog: MatDialog,
    private readonly templateService: TemplateService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateHeaderState(this.router.url);

    this.subscriptions.push(
      this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe((e) => this.updateHeaderState(e.urlAfterRedirects))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

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

  private updateHeaderState(url: string): void {
    this.isEditorPage = url.includes('/homepage-templates/editor/');

    if (!this.isEditorPage) {
      this.templateTitle = 'Template';
      return;
    }

    const id = this.extractTemplateId(this.route.root);
    if (!id) {
      this.templateTitle = 'Template';
      return;
    }

    const numericId = Number(id);
    const template = Number.isNaN(numericId)
      ? undefined
      : this.templateService.getTemplateById(numericId);

    this.templateTitle = template?.name || 'Template';
  }

  private extractTemplateId(current: ActivatedRoute): string | null {
    const id = current.snapshot.paramMap.get('id');
    if (id) {
      return id;
    }

    for (const child of current.children) {
      const fromChild = this.extractTemplateId(child);
      if (fromChild) {
        return fromChild;
      }
    }

    return null;
  }
}
