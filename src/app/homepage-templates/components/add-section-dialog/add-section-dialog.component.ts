import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentType } from '../../models/template.model';

export interface SectionDialogData {
  type?: ComponentType;
  config?: any;
}

@Component({
  selector: 'app-add-section-dialog',
  templateUrl: './add-section-dialog.component.html',
  styleUrls: ['./add-section-dialog.component.scss']
})
export class AddSectionDialogComponent {
  types: ComponentType[] = ['carousel', 'playlist', 'song', 'grid', 'banner', 'header'];
  form: FormGroup;
  isEditMode = false;

  constructor(
    private readonly dialogRef: MatDialogRef<AddSectionDialogComponent>,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: SectionDialogData
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      type: [{ value: data?.type ?? 'carousel', disabled: !!data }, Validators.required],
      title: [data?.config?.title ?? ''],
      tag: [data?.config?.tag ?? ''],
      limit: [data?.config?.limit ?? ''],
      songId: [data?.config?.songId ?? ''],
      imageUrl: [data?.config?.imageUrl ?? ''],
      link: [data?.config?.link ?? ''],
      text: [data?.config?.text ?? ''],
      style: [data?.config?.style ?? '']
    });
  }

  onTypeChange(): void {
    if (this.isEditMode) {
      return;
    }
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
    const { type, ...config } = this.form.getRawValue();
    this.dialogRef.close({ type, config });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
