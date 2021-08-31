import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/apiService/api.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { ToasterService } from 'src/app/services/toasted/toaster.service';
import { ViewService } from 'src/app/services/viewService/view.service';

@Component({
  selector: 'app-invoice-line-company-view',
  templateUrl: './invoice-line-company-view.component.html',
  styleUrls: ['./invoice-line-company-view.component.scss']
})
export class InvoiceLineCompanyViewComponent implements OnInit {

  constructor(private api: ApiService, private toaster: ToasterService, private store: StoreDataService, 
    private view: ViewService) { }

  viewInfoStatus: boolean = false;
  displayedColumns: string[] = ['internalCode' ,'description'];

  user: any;
  token: any;
  companyObject: any;
  resultInvoiceLineCompanyData: any;
  @ViewChild(MatPaginator) paginatorCustomer?: MatPaginator;
  ngOnInit(): void {
    this.user = this.store.getStoreElement('EMFETA-U-O');
    this.token = this.store.getStoreElement('EMFETA-U-T');
    this.companyObject = this.store.getStoreElement('EMFETA-C-D');

    this.view.invoiceLineCompanyView.subscribe((element: any) => {
      if(element) {
        this.resultInvoiceLineCompanyData = new MatTableDataSource<any>(element);
        this.resultInvoiceLineCompanyData.paginator = this.paginatorCustomer;
        this.viewInfoStatus = true;
      } else {
        this.viewInfoStatus = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.resultInvoiceLineCompanyData.filter = filterValue.trim().toLowerCase();
  }
}
