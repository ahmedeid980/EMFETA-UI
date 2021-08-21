import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './layout/loginLayout/login-layout/login-layout.component';
import { PageLayoutComponent } from './layout/pagesLayout/page-layout/page-layout.component';
import { LoginComponent } from './pages/loginpage/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [

    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'EMFETA/login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
