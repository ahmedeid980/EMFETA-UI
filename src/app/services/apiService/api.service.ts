import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  // private URL_LOGIN = 'http://localhost:8021/userlogin/EMFETASystem';
  // private URL_APIs = 'http://localhost:8021/api-system-controller/EMFETASystem/api';
  private URL_LOGIN = 'http://localhost:8083/demo-0.0.1-SNAPSHOT/userlogin/EMFETASystem';
  private URL_APIs = 'http://localhost:8083/demo-0.0.1-SNAPSHOT/api-system-controller/EMFETASystem/api';


  private getServerErrorMessage(error: HttpErrorResponse): string {

    switch (error.status) {

      case 404: {
        this.router.navigate(['**']);
        return `Not Found: ${error.message}`;
      }
      case 403: {
        this.router.navigate(['/EMFETA/login']);
        localStorage.clear();
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        this.router.navigate(['**']);
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        this.router.navigate(['**']);
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }

  login(userObject: any) {

    // const headerDict = {
    //   'Authorization': 'ahmbas '+token
    // }

    // const requestOptions = {
    //   headers: new HttpHeaders(headerDict),
    // };
    const headerDict = {
      'content-type': 'application/json; charset=utf-8'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(this.URL_LOGIN, userObject, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  /**
   * getUserCompanies()
   * 
   * @param userId 
   * @param token 
   * @returns 
   */
  getUserCompanies(userId: number, token: string) {

    const headerDict = {
      'Authorization': 'EMFAHM '+token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http.post(this.URL_APIs+'/getLsitOfUserAdmCompany/'+userId, null, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  getSettingList(token: string) {

    const headerDict = {
      'Authorization': 'EMFAHM '+token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http.post(this.URL_APIs+'/getSettingList', null, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  //
  getAdmAppUserCompanyByUserName$companyId(userName: string, companyId: number, token: string) {

    const headerDict = {
      'Authorization': 'EMFAHM '+token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http.post(this.URL_APIs+'/getAdmAppUserCompanyByUserName-companyId/'+userName+"/"+companyId, null, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  /**
   * 
   * 
   * @param setting object 
   * @param token 
   * @returns 
   */
   addOrUpdateSettingCompany(setting: any, token: string) {

    const headerDict = {
      'Authorization': 'EMFAHM '+token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http.post(this.URL_APIs+'/add-Or-UpdateSettingCompany', setting, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  getInvoiceResultCompanyByCompanyId(companyId: number, token: string) {

    const headerDict = {
      'Authorization': 'EMFAHM '+token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http.post(this.URL_APIs+'/getInvoiceResultCompanyByCompanyId/'+companyId, null, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  getCustomerCompanyViewByCompanyId(companyId: number, token: string) {

    const headerDict = {
      'Authorization': 'EMFAHM '+token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http.post(this.URL_APIs+'/getCustomerCompanyViewByCompanyId/'+companyId, null, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  getInvoiceCompanyViewByCompanyId(companyId: number, token: string) {

    const headerDict = {
      'Authorization': 'EMFAHM '+token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http.post(this.URL_APIs+'/getInvoiceCompanyViewByCompanyId/'+companyId, null, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  getInvoiceLineCompanyViewByCompanyId(companyId: number, token: string) {

    const headerDict = {
      'Authorization': 'EMFAHM '+token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http.post(this.URL_APIs+'/getInvoiceLineCompanyViewByCompanyId/'+companyId, null, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }


  /**
   * login information 
   */
   loginInfo() {
    let body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', '9f22e6f7-04ce-498e-a7fa-f8b16aa2bc56');
    body.set('client_secret', '9bb36982-db04-4a9e-a531-c59a200ac061');
    body.set('scope', 'InvoicingAPI');
    
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post('https://id.preprod.eta.gov.eg/connect/token', body, options).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

}
