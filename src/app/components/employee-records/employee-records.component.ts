import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/entity/department';
import { Employee } from 'src/app/entity/employee';
import { ResponseDTO } from 'src/app/entity/responseDTO';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee-records',
  templateUrl: './employee-records.component.html',
  styleUrls: ['./employee-records.component.css']
})
export class EmployeeRecordsComponent implements OnInit {
   employees :Employee[] = [] ;
   employee!: Employee;
   response!:ResponseDTO;
  constructor(private employeeService:EmployeeServiceService,private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.employee = new Employee();
    this.employee.department = new Department();
    this.displayEmployeeRecords();
  }

  displayEmployeeRecords = () =>{
    return this.employeeService.getEmployeeList().subscribe(resp=>{
      this.employees = resp;
      console.log(this.employees)
    })
  }

  searchEmployeeByname = (input:any) =>{
    if(input.target.value != null && input.target.value !=''){
       this.employeeService.getEmployeeByName(input.target.value).subscribe(resp=>{
        this.employees = resp;
      })
    }else{
      this.displayEmployeeRecords();
    }
  }

  deleteEmployee = (input:number) =>{
    if(input!= 0){
       this.employeeService.deleteEmployeeById(input).subscribe(resp=>{
        this.displayEmployeeRecords();
      })
    } 
  }

   getEmployeeById = (input:number) =>{
    if(input!= 0){
       this.employeeService.getEmployeeById(input).subscribe(resp=>{
        this.response = resp;
        this.employee = this.response.data;
        console.log(this.employee);
      })
    } 
  }
}
