import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private URL_LOGIN = 'http://localhost:8080/userlogin/EMFETASystem';
  private URL_APIs = 'http://localhost:8080/api-system-controller/EMFETASystem/api';


  private getServerErrorMessage(error: HttpErrorResponse): string {

    switch (error.status) {

      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
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

}
