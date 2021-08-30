import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toasted/toaster.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private toaster: ToasterService, private router: Router) { }

  ngOnInit(): void {
  }

  backToLogin() {
    this.router.navigate(['/EMFETA/login']);
    localStorage.clear();

    this.toaster.openSnackBar('غير مسموح لك بالدخول حاول مره اخره الدخول للنظام', 'danger-toaster');
  }

}
