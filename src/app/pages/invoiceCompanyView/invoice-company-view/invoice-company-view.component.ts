import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/apiService/api.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { ToasterService } from 'src/app/services/toasted/toaster.service';

@Component({
  selector: 'app-invoice-company-view',
  templateUrl: './invoice-company-view.component.html',
  styleUrls: ['./invoice-company-view.component.scss']
})
export class InvoiceCompanyViewComponent implements OnInit {

  constructor(private api: ApiService, private toaster: ToasterService, private store: StoreDataService) { }

  viewInfoStatus: boolean = false;
  displayedColumns: string[] = ['customerId' ,'dateTimeIssued'];

  user: any;
  token: any;
  companyObject: any;
  ngOnInit(): void {
    this.user = this.store.getStoreElement('EMFETA-U-O');
    this.token = this.store.getStoreElement('EMFETA-U-T');
    this.companyObject = this.store.getStoreElement('EMFETA-C-D');

    this.getInvoiceCompanyViewByCompanyId(this.companyObject.companyId);
  }

  resultInvoiceCompanyData: any;
  @ViewChild(MatPaginator) paginatorCustomer?: MatPaginator;
  getInvoiceCompanyViewByCompanyId(companyId: number) {
    this.api.getInvoiceCompanyViewByCompanyId(companyId, this.token).subscribe( (jwtResponse: any) =>{
      if(jwtResponse.data.length > 0) {
        this.resultInvoiceCompanyData = new MatTableDataSource<any>(jwtResponse.data);
        this.resultInvoiceCompanyData.paginator = this.paginatorCustomer;
        this.viewInfoStatus = true;
      } else {
        this.viewInfoStatus = false;
      }
    }, error => {
      this.toaster.openSnackBar('حدث خطأ في النظام', 'danger-toaster');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.resultInvoiceCompanyData.filter = filterValue.trim().toLowerCase();
  }


}
