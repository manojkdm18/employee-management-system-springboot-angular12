import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeRecordsComponent } from './components/employee-records/employee-records.component';

const routes: Routes = [
  {path:'edit/:id',component:EmployeeCreateComponent},
  {path:'search',component:EmployeeRecordsComponent},
  {path:'add',component:EmployeeCreateComponent},
  {path:'',redirectTo:"search",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
