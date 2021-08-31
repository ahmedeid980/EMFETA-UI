import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  // subscription of customer company view
  /**
   * customerCompanyView
   * fun ... updateCustomerCompanyView
   */
  private _customerCompanyView = new BehaviorSubject(null);
  customerCompanyView = this._customerCompanyView.asObservable();
  public updateCustomerCompanyView(element: any) {
    this._customerCompanyView.next(element);
  }

  // subscription of invoice company view
  /**
   * invoiceCompanyView
   * fun ... updateInvoiceCompanyView
   */
   private _invoiceCompanyView = new BehaviorSubject(null);
   invoiceCompanyView = this._invoiceCompanyView.asObservable();
   public updateInvoiceCompanyView(element: any) {
     this._invoiceCompanyView.next(element);
   }

   // subscription of invoice line company view
  /**
   * invoiceLineCompanyView
   * fun ... updateInvoiceLineCompanyView
   */
   private _invoiceLineCompanyView = new BehaviorSubject(null);
   invoiceLineCompanyView = this._invoiceLineCompanyView.asObservable();
   public updateInvoiceLineCompanyView(element: any) {
     this._invoiceLineCompanyView.next(element);
   }

  constructor() { }
}
