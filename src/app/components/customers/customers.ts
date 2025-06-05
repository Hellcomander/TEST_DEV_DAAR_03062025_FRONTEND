import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  imports: [
    MatTableModule
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

}
