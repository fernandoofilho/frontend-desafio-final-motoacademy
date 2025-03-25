import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ComparePhonesDialogComponent } from '../compare-phones-dialog/compare-phones-dialog.component';
import { MatIconModule } from '@angular/material/icon';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, FontAwesomeModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  faGithub = faGithub;
  constructor(private dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(ComparePhonesDialogComponent, {
      // width: '70%',
      height: 'auto',
      // maxWidth: '90vw',
      minWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
