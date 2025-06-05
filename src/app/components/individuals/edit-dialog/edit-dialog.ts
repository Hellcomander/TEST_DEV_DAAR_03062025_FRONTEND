import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Validators } from '@angular/forms';

interface Individual {
  idPersonaFisica: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rfc: string;
  fechaNacimiento: string;
  isEdit: boolean
}

@Component({
  selector: 'app-edit-dialog',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.css'
})
export class EditDialog {
  public data: Individual = inject(MAT_DIALOG_DATA)
  form: FormGroup;
  isEdit: boolean;

  constructor(
        public dialogRef: MatDialogRef<EditDialog>,
        private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      Nombre: [this.data.nombre || '', [Validators.required, Validators.maxLength(50)]],
      ApellidoPaterno: [this.data.apellidoPaterno || '', [Validators.required, Validators.maxLength(50)]],
      ApellidoMaterno: [this.data.apellidoMaterno || '', [Validators.required, Validators.maxLength(50)]],
      Rfc: [this.data.rfc || '', [Validators.required, Validators.maxLength(13), Validators.pattern(/^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})?$/)]],
      FechaNacimiento: [
        this.data.fechaNacimiento
          ? new Date(this.data.fechaNacimiento).toISOString().split('T')[0]
          : '',
        [Validators.required]
      ]
    });

    this.isEdit = this.data?.isEdit ?? false;
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.form.value, IdPersonaFisica: this.data.idPersonaFisica });
    }
  }
}
