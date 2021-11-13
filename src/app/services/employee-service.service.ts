import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../entity/department';
import { Employee } from '../entity/employee';
import { ResponseDTO } from '../entity/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  
  URL:string = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {

   }

   getEmployeeById = (id:number) =>{
      return this.httpClient.get<ResponseDTO>(this.URL+'employees/'+id);
    }
 
   getEmployeeList():Observable<Employee[]> {
      return this.httpClient.get<Employee[]>(this.URL+'employees/');
   }
   getEmployeeByName (name:string):Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.URL+'employees/search/'+name);
 }

   getDepartmentList():Observable<Department[]>{
    return this.httpClient.get<Department[]>(this.URL+'departments/');
   }

   createOrUpdateEmployee(emp:Employee ){
     return this.httpClient.post<ResponseDTO>(this.URL+"/save",emp);
   } 

   deleteEmployeeById(id:number){
    return this.httpClient.get<ResponseDTO>(this.URL+'employees/delete/'+id);
   }

}
