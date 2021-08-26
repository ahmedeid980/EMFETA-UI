import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/apiService/api.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { ToasterService } from 'src/app/services/toasted/toaster.service';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {

  formGroup = new FormGroup( {
    "companyId": new FormControl(null, [Validators.required]),
    "companyObject": new FormControl(null, [Validators.required]),
    "id": new FormControl(null, []),
    "grantId": new FormControl(null, [Validators.required]),
    "clientId": new FormControl(null, [Validators.required]),
    "secretId": new FormControl(null, [Validators.required]),
    "admUserId": new FormControl(null, [Validators.required]),
    "companyName": new FormControl(null, [Validators.required]),
    "orgId": new FormControl(null, [Validators.required]),
    "branchId": new FormControl(null, [Validators.required]),
  });

  constructor(private api: ApiService, private store: StoreDataService, 
    private toaster: ToasterService) { }

  user: any;
  token: any;
  usercompanies: any;
  selectedValue?: string;
  selectedCar?: string;
  addOrUdateStatus: boolean = false;

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
    this.getUserCompanies(this.user.userName, this.token);

    this.getSettingCompanyList(this.token);
  }

  displayedColumns: string[] = ['companyName', 'edit'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.settingListOfTable.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  settingList: any;
  settingListOfTable: any;
  userInfo: any;
  getSettingCompanyList(token: string) {
    this.api.getSettingList(token).subscribe( (setting: any) =>{
      if(setting.dataList[1]) {
        // انا عملت هنا العكس
        this.settingList = setting.dataList[1];
        this.userInfo = setting.dataList[0];
        this.settingListOfTable = new MatTableDataSource(setting.dataList[0]);
        this.settingListOfTable.paginator = this.paginator;
      }
      
    }, error => {
      this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster');
    });
  }

  // about select field of company change
  selectedDevice?: string = "";
  onChangeItem(newValue: any) {
    let settingCompany = this.settingList?.find( (item: any) => item?.companyId == newValue.value?.companyId );
    if(settingCompany) {
      this.resetComponentFields();
      this.toaster.openSnackBar('( secret id, client id ) الشركة مسجل لها من قبل ', 'warning-toaster');
    }

  }

  // about add setting company ...
  addSettingCompany() {
    let company = this.formGroup.get('companyObject')?.value;

    // get branch id ...
    if(company?.companyId) {

      this.api.getAdmAppUserCompanyByUserName$companyId(this.user?.userName, company?.companyId, this.token)
    .subscribe((getBranchId: any) => {
      if(getBranchId) {
        this.formGroup.get('branchId')?.setValue(getBranchId?.data.branchFlag);

        this.formGroup.get('companyName')?.setValue(company?.companyName);
        this.formGroup.get('companyId')?.setValue(company?.companyId);
        this.formGroup.get('orgId')?.setValue(company?.orgId);
        this.formGroup.get('admUserId')?.setValue(this.user?.userName);

        if(this.formGroup.valid) {
          let settingCompany = this.settingList?.find( (item: any) => item?.companyId == company?.companyId );
          if(settingCompany) {
            this.resetComponentFields();
            this.toaster.openSnackBar(' هذه الشركة مسجلة من قبل ', 'warning-toaster');
            return ;
          }

          // add setting here ..
          this.api.addOrUpdateSettingCompany(this.formGroup.value, this.token).subscribe( (settingAdded: any) =>{

            if(settingAdded) {
              this.toaster.openSnackBar('تم اضافة البيانات بنجاح', 'success-toaster');
              this.getSettingCompanyList(this.token);
              this.resetComponentFields();
            }

          }, error => this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster'));

        } else {
          this.toaster.openSnackBar('قم باستكمال جميع البيانات اولا', 'warning-toaster')
        }
      }
    }, error => this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster'));

    } else {
      this.toaster.openSnackBar('قم باستكمال جميع البيانات اولا', 'warning-toaster')
    }
    
  }

  elementUpdate: any;
  getForUpdate(element: any) {
    console.log(element);
    if(element) {
      this.elementUpdate = element;
      let companyObject = this.usercompanies.find( (item: any) => item.companyId === element.companyId );
      this.formGroup.get('companyObject')?.setValue(companyObject);

      this.formGroup.get('admUserId')?.setValue(element.admUserId);
      this.formGroup.get('branchId')?.setValue(element.branchId);
      this.formGroup.get('clientId')?.setValue(element.clientId);
      this.formGroup.get('companyId')?.setValue(element.companyId);
      this.formGroup.get('companyName')?.setValue(element.companyName);
      this.formGroup.get('grantId')?.setValue(element.grantId);
      this.formGroup.get('id')?.setValue(element.id);
      this.formGroup.get('orgId')?.setValue(element.orgId);
      this.formGroup.get('secretId')?.setValue(element.secretId);
      this.addOrUdateStatus = true;
    }
  }

  //for update settings
  updateSettingCompany() {

    let company = this.formGroup.get('companyObject')?.value;

    // get branch id ...
    if(company?.companyId) {

      this.api.getAdmAppUserCompanyByUserName$companyId(this.user?.userName, company?.companyId, this.token)
    .subscribe((getBranchId: any) => {
      if(getBranchId) {
        this.formGroup.get('branchId')?.setValue(getBranchId?.data.branchFlag);

        this.formGroup.get('companyName')?.setValue(company?.companyName);
        this.formGroup.get('companyId')?.setValue(company?.companyId);
        this.formGroup.get('orgId')?.setValue(company?.orgId);
        this.formGroup.get('admUserId')?.setValue(this.user?.userName);

        if(this.formGroup.valid ) {
          let settingCompany = this.userInfo?.find( (item: any) => item?.companyId == this.elementUpdate?.companyId );
          if(settingCompany && (this.elementUpdate.id != settingCompany.id)) {
            this.resetComponentFields();
            this.toaster.openSnackBar(' هذه الشركة مسجلة من قبل ', 'warning-toaster');
            return ;
          }

          // add setting here ..
          this.api.addOrUpdateSettingCompany(this.formGroup.value, this.token).subscribe( (settingAdded: any) =>{

            if(settingAdded) {
              this.toaster.openSnackBar('تم تعديل البيانات بنجاح', 'success-toaster');
              this.getSettingCompanyList(this.token);
              this.resetComponentFields();
            }

          }, error => this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster'));

        } else {
          this.toaster.openSnackBar('قم باستكمال جميع البيانات اولا', 'warning-toaster')
        }
      }
    }, error => this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster'));

    } else {
      this.toaster.openSnackBar('قم باستكمال جميع البيانات اولا', 'warning-toaster')
    }

  }

  resetComponentFields() {
    this.formGroup.reset();
    this.addOrUdateStatus = false;
  }

}
