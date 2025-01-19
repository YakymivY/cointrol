import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { positiveNumberValidator } from '../../validators/positive-number.validator';

@Component({
    selector: 'app-operation-dialog',
    imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './operation-dialog.component.html',
    styleUrl: './operation-dialog.component.css'
})
export class OperationDialogComponent {
  operationsForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<OperationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string },
    private fb: FormBuilder,
  ) {
    this.operationsForm = this.fb.group({
      amount: ['', [Validators.required, positiveNumberValidator()]],
    });
  }

  onSubmit() {
    if (this.operationsForm.valid) {
      const amount = this.operationsForm.get('amount')?.value;
      const result = { action: this.data.action, amount };
      this.dialogRef.close(result);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
