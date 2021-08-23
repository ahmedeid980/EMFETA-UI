import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageLayoutComponent } from './layout/pagesLayout/page-layout/page-layout.component';
import { LoginLayoutComponent } from './layout/loginLayout/login-layout/login-layout.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { LoginComponent } from './pages/loginpage/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogInfoComponent } from './utilsForPages/dialog/dialogInfo/dialog-info/dialog-info.component';
import { CommercialTransactionsComponent } from './pages/commercialTransactions/commercial-transactions/commercial-transactions.component';
import { CompanySettingsComponent } from './pages/settings/company-settings/company-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    LoginLayoutComponent,
    LoginComponent,
    DialogInfoComponent,
    CommercialTransactionsComponent,
    CompanySettingsComponent
  ],
  imports: [
    BrowserModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientModule,
    AppRoutingModule, MatToolbarModule, MatMenuModule, MatStepperModule, MatFormFieldModule, MatSelectModule,
    BrowserAnimationsModule, MatSidenavModule, MatInputModule, MatExpansionModule, MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
