import { Component } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatListModule,
    MatSidenavContent,
    MatToolbar,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  menuOpened: boolean = true;

  changeMenuState() {
    this.menuOpened = !this.menuOpened
  }
}
