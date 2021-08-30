import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  private URL_LOGIN = 'http://localhost:8080/userlogin/EMFETASystem';
  private URL_APIs = 'http://localhost:8080/api-system-controller/EMFETASystem/api';


  private getServerErrorMessage(error: HttpErrorResponse): string {

    switch (error.status) {

      case 404: {
        return `Not Found: ${error.message}`;
        this.router.navigate(['**']);
      }
      case 403: {
        return `Access Denied: ${error.message}`;
        this.router.navigate(['**']);
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
        this.router.navigate(['**']);
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
        this.router.navigate(['**']);
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

}
