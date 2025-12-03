import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentType } from '../../models/template.model';

@Component({
  selector: 'app-add-section-dialog',
  templateUrl: './add-section-dialog.component.html',
  styleUrls: ['./add-section-dialog.component.scss']
})
export class AddSectionDialogComponent {
  types: ComponentType[] = ['carousel', 'playlist', 'song', 'grid', 'banner', 'header'];
  form: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<AddSectionDialogComponent>,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      type: ['carousel', Validators.required],
      title: [''],
      tag: [''],
      limit: [''],
      songId: [''],
      imageUrl: [''],
      link: [''],
      text: [''],
      style: ['']
    });
  }

  onTypeChange(): void {
    const selected = this.form.get('type')?.value as ComponentType;
    // Clear non-relevant controls when type changes
    this.form.patchValue({
      title: '',
      tag: '',
      limit: '',
      songId: '',
      imageUrl: '',
      link: '',
      text: '',
      style: ''
    });

    // Set validators per type if needed in the future
    // For now, keep simple optional fields
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    const { type, ...config } = this.form.value;
    this.dialogRef.close({ type, config });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
