import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/entity/employee';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Address } from 'src/app/entity/address';
import { Department } from 'src/app/entity/department';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ResponseDTO } from 'src/app/entity/responseDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  departments : Department[]= [];
  empForm : any;
  employee!: Employee;
  response!:ResponseDTO;
  message !:string;
  empid!:number;
  constructor(private employeeService:EmployeeServiceService,private actRoute: ActivatedRoute) { 
    this.empid = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.employee = new Employee();
    this.employee.address = new Address();
    this.employee.department = new Department();
    this.response = new ResponseDTO();
    this.getDepartmentList();
    this.empForm = new FormGroup({
      emprfnum:new FormControl(null),
      firstName:new FormControl(null,[Validators.required]),
      lastName:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      mobile:new FormControl(null,[Validators.required,Validators.pattern("^[7-9][0-9]{9}$")]),
      designation:new FormControl(null,[Validators.required]),
      salary:new FormControl(null,[Validators.required,Validators.pattern("^(0|[1-9][0-9]*)$")]),
      gender:new FormControl(null,[Validators.required]),
      dateofbirth:new FormControl(null,[Validators.required]),
      department:new FormControl(null,[Validators.required]),
      pincode:new FormControl(null,[Validators.required,Validators.pattern("^(0|[1-9][0-9]*)$")]),
      country:new FormControl(null,[Validators.required]),
      state:new FormControl(null,[Validators.required]),
      city:new FormControl(null,[Validators.required]),
    })

    if(this.empid != null){
      this.getEmployeeById(this.empid);
    }
  }

  get emprfnum(){return this.empForm.get('emprfnum');}
  get firstName(){return this.empForm.get('firstName');}
  get lastName() {return this.empForm.get('lastName');}
  get email(){return this.empForm.get('email');}
  get mobile() {return this.empForm.get('mobile');}
  get designation(){return this.empForm.get('designation');}
  get salary() {return this.empForm.get('salary');}
  get gender(){return this.empForm.get('gender');}
  get dateofbirth() {return this.empForm.get('dateofbirth');}
  get address(){return this.empForm.get('address');}
  get department() {return this.empForm.get('department');}
  get pincode() {return this.empForm.get('pincode');}
  get country() {return this.empForm.get('country');}
  get state() {return this.empForm.get('state');}
  get city() {return this.empForm.get('city');}


    getDepartmentList =() =>{
      return this.employeeService.getDepartmentList().subscribe(resp=>{
        this.departments = resp;
        console.log(this.departments);
      });
    }
  createEmployee = () =>{
    if(this.empForm.valid){
      return this.employeeService.createOrUpdateEmployee(this.employee).subscribe(resp=>{
        this.response = resp;
        if(this.response != null){
          if(this.response.statusCode == 0 && this.response.status == 'SUCCESS'){
            this.empForm.reset();
            this.message = this.response.message == 'RECORD SAVED' ? "Record saved successfully." : "Record updated successfully.";
          }else if(this.response.statusCode == 1 && this.response.status == 'FAILD'){
            if(this.response.message == 'MOBILE_EXISTS'){
              this.message = "Mobile number is already exists.";
            }else if(this.response.message == 'EMAIL_EXISTS'){
              this.message = "Email Id is already exists.";
            }else{
              this.message = this.response.message;
            }
          }
        }
      });
    }
    return ;
  };

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
