import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Template, Section } from '../../models/template.model';
import { TemplateService } from '../../services/template.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSectionDialogComponent } from '../../components/add-section-dialog/add-section-dialog.component';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {
  template?: Template;
  private isNew = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly templateService: TemplateService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === 'new') {
      this.isNew = true;
      this.template = this.createNewTemplate();
      return;
    }

    const id = Number(idParam);
    if (Number.isNaN(id)) {
      this.template = undefined;
      return;
    }

    this.template = this.templateService.getTemplateById(id);
  }

  addSection(): void {
    if (!this.template) {
      return;
    }

    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.template) {
        const newSection: Section = {
          id: Date.now(),
          type: result.type,
          config: result.config
        };

        this.template.sections = [...this.template.sections, newSection];
        this.saveTemplate();
      }
    });
  }

  editSection(section: Section): void {
    if (!this.template) {
      return;
    }

    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      width: '450px',
      data: {
        type: section.type,
        config: section.config
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.template) {
        this.template.sections = this.template.sections.map((s) =>
          s.id === section.id ? { ...s, type: result.type, config: result.config } : s
        );
        this.saveTemplate();
      }
    });
  }

  deleteSection(sectionId: number): void {
    if (!this.template) {
      return;
    }

    this.template.sections = this.template.sections.filter((s) => s.id !== sectionId);
    this.saveTemplate();
  }

  reorderSections(event: CdkDragDrop<Section[]>): void {
    if (!this.template) {
      return;
    }

    const updated = [...this.template.sections];
    moveItemInArray(updated, event.previousIndex, event.currentIndex);
    this.template.sections = updated;
    this.saveTemplate();
  }

  saveTemplate(): void {
    if (!this.template) {
      return;
    }

    this.template.lastModified = new Date().toISOString();
    if (this.isNew) {
      this.templateService.addTemplate(this.template);
      this.isNew = false;
    } else {
      this.templateService.updateTemplate(this.template);
    }
  }

  private createNewTemplate(): Template {
    return {
      id: Date.now(),
      name: 'New Template',
      description: '',
      userType: 'Both',
      lastModified: new Date().toISOString(),
      sections: []
    };
  }

  trackSection(index: number, section: Section): number {
    return section.id;
  }

  getConfigEntries(section: Section): { label: string; value: string }[] {
    const config = section.config || {};
    const entries = Object.entries(config)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => ({
        label: this.formatLabel(key),
        value: Array.isArray(value) || typeof value === 'object'
          ? JSON.stringify(value)
          : String(value)
      }));

    return entries.length
      ? entries
      : [{ label: 'Details', value: 'No additional details provided' }];
  }

  private formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^./, (c) => c.toUpperCase());
  }
}
