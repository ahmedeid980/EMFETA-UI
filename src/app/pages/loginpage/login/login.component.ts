import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService/api.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { ToasterService } from 'src/app/services/toasted/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required])
  });

  secondFormGroup = new FormGroup({
    'companyList': new FormControl(null, [Validators.required]),
  });

  constructor(private _formBuilder: FormBuilder, private api: ApiService,
     private store: StoreDataService, private router: Router, private toaster: ToasterService) {}

  ngOnInit() {
    
  }

  userComanyList: any;

  login(stepper: MatStepper) {

    if(this.formGroup.valid) {
      this.api.login(this.formGroup.value).subscribe( (userObject: any) => {
        if(userObject && userObject.user) {
          
          this.store.storeElement('EMFETA-U-O', userObject.user);
          this.store.storeElement('EMFETA-U-T', userObject.token);
          this.userComanyList = userObject.dataList[1];
          if(userObject.data != 'no-company') {
            this.toaster.openSnackBar('تم ستجيل الدخول بنجاح', 'success-toaster');
            stepper.next();
          } else {
            this.toaster.openSnackBar('المستخدم غير مرتبط باى شركة', 'warning-toaster');
          }
        } else {
          this.toaster.openSnackBar('أسم المستخدم او كلمة المرور غير صحيحة', 'danger-toaster');
        }

      }, error => {
        this.toaster.openSnackBar('حدث خطأ في عملية الدخول للنظام', 'danger-toaster');
      });
    }
  }

  selectedValue?: string;

  tOCommercialTransactions() {
    if(this.secondFormGroup.valid) {
      this.store.storeElement('EMFETA-C-D', this.secondFormGroup.value);
      this.router.navigate(['/EMFETA/commercial-transactions']);
    }
    
  }

}