import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent } from 'src/app/utilsForPages/dialog/dialogInfo/dialog-info/dialog-info.component';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnInit {
  showFiller = false;

  ngOnInit(): void {
  }

  constructor(public dialog: MatDialog) {}

  message?: string;
  dialogResult?: string;
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '420px',
      data: {message: 'هل ترغب في تسجيل الخروج من السيستم ؟'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      if(this.dialogResult) {
        // say something

      }
    });
  }

}
