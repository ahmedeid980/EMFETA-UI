import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreDataService } from 'src/app/services/storage/store-data.service';

@Injectable({
  providedIn: 'root'
})
export class CommercialTransactionGuard implements CanActivate {

  user: any;

  constructor(private store: StoreDataService, private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user = this.store.getStoreElement('EMFETA-U-O');
      if(!this.user) {
        localStorage.clear();
        this.router.navigate(['/EMFETA/login']);

        return false;
      } else {
        return true;
      }
  }
  
}
