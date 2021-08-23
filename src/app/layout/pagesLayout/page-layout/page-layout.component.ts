import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { DialogInfoComponent } from 'src/app/utilsForPages/dialog/dialogInfo/dialog-info/dialog-info.component';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnInit {
  showFiller = false;
  user: any;
  userName?: string;

  ngOnInit(): void {
    this.user = this.store.getStoreElement('EMFETA-U-O');
    this.userName = this.user.userAppName;
  }

  constructor(public dialog: MatDialog, private router: Router, private store: StoreDataService) {}

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
        localStorage.clear();
        this.router.navigate(['/EMFETA/login']);
      }
    });
  }

}
