import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ApiService } from 'src/app/services/apiService/api.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { ToasterService } from 'src/app/services/toasted/toaster.service';

@Component({
  selector: 'app-commercial-transactions',
  templateUrl: './commercial-transactions.component.html',
  styleUrls: ['./commercial-transactions.component.scss']
})
export class CommercialTransactionsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  constructor(private api: ApiService, private store: StoreDataService, 
    private toaster: ToasterService) { }

  user: any;
  token: any;
  companyObject: any;
  usercompanies: any;
  selectedValue?: string;
  selectedCar?: string;

  secondFormGroup = new FormGroup({
    'companyList': new FormControl(null, []),
  });

  getUserCompanies(user: any, token: string) {
    this.api.getUserCompanies(user, token).subscribe( (result: any) =>{
      if(result) {
        this.usercompanies = result.dataList[1];
      }
    }, error => {
      this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster');
    });
  }

  ngOnInit(): void {
    this.user = this.store.getStoreElement('EMFETA-U-O');
    this.token = this.store.getStoreElement('EMFETA-U-T');
    this.companyObject = this.store.getStoreElement('EMFETA-C-D');
    this.getInvoiceResultCompanyByCompanyId(this.companyObject.companyList.companyId);
    this.getUserCompanies(this.user.userName, this.token);
  }

  getInvoiceResultCompanyByCompanyId( companyId: number ) {

    this.api.getInvoiceResultCompanyByCompanyId(companyId, this.token).subscribe( (jwtResponse: any) => {
    }, error => {
      this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster');
    });

  }

  // change informations
  onChangeItem(newValue: any) {
    this.getInvoiceResultCompanyByCompanyId(newValue.value.companyId);
  }

}
