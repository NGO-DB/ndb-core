import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';

@Injectable()
export class ConfirmationDialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(title: string, text: string): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: { title: title, text: text }
    });
  }
}
