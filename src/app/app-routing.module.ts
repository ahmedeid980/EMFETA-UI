import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommercialTransactionGuard } from './guards/commercialTransactionGuard/commercial-transaction.guard';
import { CompanySettingGuard } from './guards/companySettingGuard/company-setting.guard';
import { LoginGuard } from './guards/loginGuard/login.guard';
import { LoginLayoutComponent } from './layout/loginLayout/login-layout/login-layout.component';
import { PageLayoutComponent } from './layout/pagesLayout/page-layout/page-layout.component';
import { CommercialTransactionsComponent } from './pages/commercialTransactions/commercial-transactions/commercial-transactions.component';
import { LoginComponent } from './pages/loginpage/login/login.component';
import { NotFoundComponent } from './pages/pageNotFound/not-found/not-found.component';
import { CompanySettingsComponent } from './pages/settings/company-settings/company-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/EMFETA/login', pathMatch: 'full' },
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: 'EMFETA/commercial-transactions',
        component: CommercialTransactionsComponent,
        canActivate: [CommercialTransactionGuard]
      },
      {
        path: 'EMFETA/company-settings',
        component: CompanySettingsComponent,
        canActivate: [CompanySettingGuard]
      }
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'EMFETA/login',
        component: LoginComponent,
        canActivate: [LoginGuard]
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
