import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';

const STORAGE_KEY = 'templates';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: Template[] = [];

  constructor() {
    this.templates = this.loadTemplates();
  }

  getTemplates(): Template[] {
    return this.templates;
  }

  getTemplateById(id: number): Template | undefined {
    return this.templates.find((t) => t.id === id);
  }

  addTemplate(template: Template): void {
    const next: Template = { ...template, sections: [] };
    this.templates = [...this.templates, next];
    this.saveTemplates();
  }

  updateTemplate(updated: Template): void {
    this.templates = this.templates.map((t) => (t.id === updated.id ? { ...updated } : t));
    this.saveTemplates();
  }

  private loadTemplates(): Template[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Template[];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  private saveTemplates(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.templates));
  }
}
