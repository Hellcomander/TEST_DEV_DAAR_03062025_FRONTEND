import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditDialog } from './edit-dialog/edit-dialog';

interface Individual {
  idPersonaFisica: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rfc: string;
  fechaNacimiento: string;
}

@Component({
  selector: 'app-individuals',
  imports: [
    MatTableModule,
    CommonModule,
    SweetAlert2Module,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './individuals.html',
  styleUrl: './individuals.css'
})

export class Individuals implements OnInit {

  displayedColumns: string[] = ['idPersonaFisica', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'rfc', 'fechaNacimiento', 'actions'];
  individuals: Individual[] = []
  private http = inject(HttpClient);
  private dialog: MatDialog = inject(MatDialog)

  swalLoaderOptions = {
    didOpen: () => {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
  }

  ngOnInit(): void {

    Swal.fire({...this.swalLoaderOptions, text: 'Obteniendo información...'});

    this.http.get(`${environment.apiUrl}/persona-fisica`)
        .subscribe({
          next: (response: any) => {
            this.individuals = response.map((individual: any) => {
              return {
                idPersonaFisica: individual.idPersonaFisica,
                nombre: individual.nombre,
                apellidoPaterno: individual.apellidoPaterno,
                apellidoMaterno: individual.apellidoMaterno,
                rfc: individual.rfc,
                fechaNacimiento: individual.fechaNacimiento,
              }
            })

            Swal.close();
          },
          error: (error) => {
            console.error(error);
            Swal.close();
            Swal.fire('Error', 'No se pudo cargar la información', 'error');
          },
        })
  }

  addNew() {
    const dialogRef = this.dialog.open(EditDialog, {
      data: { isEdit: false },
      width: '400vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire({...this.swalLoaderOptions, text: 'Guardando información...'});
        this.http.post(`${environment.apiUrl}/persona-fisica`, {...result, UsuarioAgrega: 1}).subscribe({
          next: (created: any) => {
            Swal.close();
            Swal.fire('Agregado', 'La persona fue registrada correctamente.', 'success');
            this.individuals = [...this.individuals, created];
          },
          error: () => {
            Swal.close();
            Swal.fire('Error', 'No se pudo registrar.', 'error')
          }
        });
      }
    });
  }


  editIndividual(individual: Individual) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: { ...individual, isEdit: true },
      width: '400vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire({...this.swalLoaderOptions, text: 'Guardando información...'});
        this.http.put(`${environment.apiUrl}/persona-fisica/${result.IdPersonaFisica}`, result).subscribe({
          next: () => {
            Swal.close();
            Swal.fire('Actualizado', 'La persona fue actualizada correctamente.', 'success');
            const index = this.individuals.findIndex(i => i.idPersonaFisica === result.IdPersonaFisica);
            if (index !== -1) {
              console.log(result);
              this.individuals[index] = {
                idPersonaFisica: result.IdPersonaFisica,
                nombre: result.Nombre,
                apellidoPaterno: result.ApellidoPaterno,
                apellidoMaterno: result.ApellidoMaterno,
                rfc: result.Rfc,
                fechaNacimiento: result.FechaNacimiento,
              };
              this.individuals = [...this.individuals];
            }
          },
            error: (error) => {
              Swal.close();
              if (error.status === 409) {
                Swal.fire('RFC duplicado', 'Ya existe una persona con ese RFC.', 'warning');
              } else {
                Swal.fire('Error', 'No se pudo actualizar.', 'error');
              }
            }
        });
      }
    });
  }

  deleteIndividual(individual: Individual) {
    Swal.fire({
      title: '¿Estás seguro?',
      html: `¿Eliminar a <b>${individual.nombre} ${individual.apellidoPaterno}</b>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({...this.swalLoaderOptions, text: 'Eliminado...'});
        this.http.delete(`${environment.apiUrl}/persona-fisica/${individual.idPersonaFisica}`)
          .subscribe({
            next: () => {
              Swal.close();
              Swal.fire('Eliminado', 'El registro fue eliminado.', 'success');
              this.individuals = this.individuals.filter(i => i.idPersonaFisica !== individual.idPersonaFisica);
            },
            error: () => {
              Swal.close();
              Swal.fire('Error', 'No se pudo eliminar.', 'error');
            }
          });
      }
    });
  }
}
