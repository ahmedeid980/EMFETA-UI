import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/apiService/api.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { ToasterService } from 'src/app/services/toasted/toaster.service';
import { ViewService } from 'src/app/services/viewService/view.service';

@Component({
  selector: 'app-invoice-company-view',
  templateUrl: './invoice-company-view.component.html',
  styleUrls: ['./invoice-company-view.component.scss']
})
export class InvoiceCompanyViewComponent implements OnInit {

  constructor(private api: ApiService, private toaster: ToasterService, private store: StoreDataService, 
    private view: ViewService) { }

  viewInfoStatus: boolean = false;
  displayedColumns: string[] = ['customerId' ,'dateTimeIssued'];

  user: any;
  token: any;
  companyObject: any;
  resultInvoiceCompanyData: any;
  @ViewChild(MatPaginator) paginatorCustomer?: MatPaginator;
  ngOnInit(): void {
    this.user = this.store.getStoreElement('EMFETA-U-O');
    this.token = this.store.getStoreElement('EMFETA-U-T');
    this.companyObject = this.store.getStoreElement('EMFETA-C-D');

    // this.getInvoiceCompanyViewByCompanyId(this.companyObject.companyId);
    this.view.invoiceCompanyView.subscribe((element: any) => {
      if(element) {
        this.resultInvoiceCompanyData = new MatTableDataSource<any>(element);
        this.resultInvoiceCompanyData.paginator = this.paginatorCustomer;
        this.viewInfoStatus = true;
      } else {
        this.viewInfoStatus = false;
      }
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.resultInvoiceCompanyData.filter = filterValue.trim().toLowerCase();
  }


}
