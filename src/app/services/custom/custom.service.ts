import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
// import  Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  constructor() {}

  checkEmail(email: string) {
    let newEmail = email.split('@')[0];

    return newEmail + '@gmail.com';
  }

  resetComponentElement(formGroup: any) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      formGroup.get(key).reset();
    });
  }

  // no special chars ...
  noSpecialChars(value: string): boolean {
    const regexPattern = new RegExp(
      /[~`!#$%\^/&*()+=@.\-\[\]\\';,{}|\\":<>\?]/g
    ); //unacceptable chars
    if (regexPattern.test(value)) {
      return true;
    }
    return false;
  }

  // subscription of progress bar
  /**
   * progressBar
   * fun ... updateProgessBar
   */
   private _progressBar = new BehaviorSubject(0);
   invoiceLineCompanyView = this._progressBar.asObservable();
   public updateProgressBar(element: any) {
     this._progressBar.next(element);
   }

}
