import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientslistComponent } from './clientslist/clientslist.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'client', component: ClientslistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
