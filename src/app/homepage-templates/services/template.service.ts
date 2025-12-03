import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Template } from '../models/template.model';

const STORAGE_KEY = 'templates';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: Template[] = [];
  private readonly templates$ = new BehaviorSubject<Template[]>([]);

  constructor() {
    this.templates = this.loadTemplates();
    this.templates$.next(this.templates);
  }

  getTemplates(): Template[] {
    return [...this.templates];
  }

  templatesChanges() {
    return this.templates$.asObservable();
  }

  getTemplateById(id: number): Template | undefined {
    return this.templates.find((t) => t.id === id);
  }

  addTemplate(input: Pick<Template, 'name' | 'description' | 'userType'> & Partial<Pick<Template, 'id' | 'lastModified' | 'sections'>>): Template {
    const next: Template = {
      id: input.id ?? Date.now(),
      name: input.name,
      description: input.description,
      userType: input.userType,
      lastModified: input.lastModified ?? new Date().toISOString(),
      sections: input.sections ?? []
    };

    this.templates = [...this.templates, next];
    this.emitAndPersist();
    return next;
  }

  updateTemplate(updated: Template): void {
    this.templates = this.templates.map((t) => (t.id === updated.id ? { ...updated } : t));
    this.emitAndPersist();
  }

  deleteTemplate(id: number): void {
    this.templates = this.templates.filter((t) => t.id !== id);
    this.emitAndPersist();
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

  private emitAndPersist(): void {
    this.templates$.next([...this.templates]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.templates));
  }
}
