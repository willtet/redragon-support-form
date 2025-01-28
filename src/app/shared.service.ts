import { Injectable } from '@angular/core';
import { SerieInfoDialogComponent } from './serie-info-dialog/serie-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private dialog: MatDialog) {}

  openInfoDialog(): void {
      this.dialog.open(SerieInfoDialogComponent, {
        width: '700px',
      });
  }

}
