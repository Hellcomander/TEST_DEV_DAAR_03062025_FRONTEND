import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customers',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  exportExcel() {

  }
}
