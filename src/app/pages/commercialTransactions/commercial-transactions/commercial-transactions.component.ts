import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  viewInfoStatus: boolean = false;

  secondFormGroup = new FormGroup({
    'companyList': new FormControl(null, []),
  });

  getUserCompanies(user: any, token: string) {
    this.api.getUserCompanies(user, token).subscribe( (result: any) =>{
      if(result) {
        this.usercompanies = result.dataList[1];
        if(this.companyObject) {
          let company = this.usercompanies.find( (item: any) => item.companyId === this.companyObject.companyId );
          if(company)
            this.secondFormGroup.get('companyList')?.setValue(company);
        }
      }
    }, error => {
      this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster');
    });
  }

  ngOnInit(): void {
    this.user = this.store.getStoreElement('EMFETA-U-O');
    this.token = this.store.getStoreElement('EMFETA-U-T');
    this.companyObject = this.store.getStoreElement('EMFETA-C-D');
    
    this.getInvoiceResultCompanyByCompanyId(this.companyObject.companyId);
    this.getUserCompanies(this.user.userName, this.token);

    
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  resultCompanyData: any;
  resultCompanyDataForTable: any;
  getInvoiceResultCompanyByCompanyId( companyId: number ) {

    this.api.getInvoiceResultCompanyByCompanyId(companyId, this.token).subscribe( (jwtResponse: any) => {
      if(jwtResponse.data.length > 0) {
        this.resultCompanyData = new MatTableDataSource<any>(jwtResponse.data);
        this.resultCompanyData.paginator = this.paginator;
        this.viewInfoStatus = true;
      } else {
        this.viewInfoStatus = false;
      }

    }, error => {
      this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster');
    });

  }

  // change informations
  onChangeItem(newValue: any) {
    if(newValue.value) {
      this.store.storeElement('EMFETA-C-D', newValue.value);
    }
    this.getInvoiceResultCompanyByCompanyId(newValue.value.companyId);
    window.location.reload();
  }

  displayedColumns: string[] = ['select', 'id', 'state', 'errors'];
  
  selection = new SelectionModel<ResultCompany>(true, []);

  isAllSelected() {
    const numSelected = this.selection?.selected.length;
    const numRows = this.resultCompanyData?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection?.select(...this.resultCompanyData.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection?.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.resultCompanyData.filter = filterValue.trim().toLowerCase();
  }

  // send data ... 
  /**
   * send data to ERP system ...
   */
  sendData() {
    if(this.selection.selected.length > 0)
      console.log(this.selection.selected);
    else
      this.toaster.openSnackBar('يجب اختيار فاتورة على الاقل', 'warning-toaster');
  }

}

interface ResultCompany {
  id: number;
  errors: string;
  uuid: string;
  state: boolean;
  companyId: number;
  subMissionUUID: string;
}
