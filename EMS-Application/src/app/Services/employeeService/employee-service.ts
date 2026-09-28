import { HttpClient } from '@angular/common/http';
import { Service,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseWrapper, PaggedResult } from '../../Models/designation_model';
import { UserModel } from '../../Models/UserModel';
import { UserDetailsDTO } from '../../Models/UserDetailsDTO';

@Service()
export class EmployeeService {
  private readonly baseURL:string='http://localhost:5103/api/v1/Employee/';
  private httpClient:HttpClient=inject(HttpClient);

  getAllEmployees():Observable<APIResponseWrapper<employeeDTO[]>>{
   return this.httpClient.get<APIResponseWrapper<employeeDTO[]>>(this.baseURL+'GetAllEmployee')
  }
  addNewEmployee(addEmployee:employeeAddDTO):Observable<APIResponseWrapper<employeeDTO>>{
    return this.httpClient.post<APIResponseWrapper<employeeDTO>>(this.baseURL+'AddEmployee',addEmployee)
  }
  editEmployee(editEmployee:employeeDTO):Observable<APIResponseWrapper<employeeDTO>>{
    return this.httpClient.put<APIResponseWrapper<employeeDTO>>(this.baseURL+'UpdateEmployee',editEmployee)
  }
  removeEmployee(empId:number):Observable<APIResponseWrapper<string>>{
    return this.httpClient.delete<APIResponseWrapper<string>>(this.baseURL+`RemoveEmployee?empId=${empId}`)
  }
  getAEmployee(userId:UserDetailsDTO):Observable<APIResponseWrapper<employeeDTO>>{
    return this.httpClient.post<APIResponseWrapper<employeeDTO>>(this.baseURL+'FindEmployeeById',userId)
  }
  getUserDetails(userId:string|null):Observable<APIResponseWrapper<UserModel>>{
    return this.httpClient.get<APIResponseWrapper<UserModel>>(this.baseURL+`GetUserDetails?userId=${userId}`)
  }
    getUserDetailsByUserId(userId:string|null):Observable<APIResponseWrapper<UserModel>>{
    return this.httpClient.get<APIResponseWrapper<UserModel>>(this.baseURL+`GetUserDetailsByUserId?userId=${userId}`)
  }
  getAllUsers():Observable<APIResponseWrapper<UserModel[]>>{
    return this.httpClient.get<APIResponseWrapper<UserModel[]>>(this.baseURL+'GetAllUsersDetails');
  }
  getAllEmployeesWithPagination(searchText?:string,pageNumber:number=1,pageSize:number=10,sortColumn:string='fullname',sortOrder:string='DESC'):Observable<PaggedResult<employeeDTO[]>>{
    return this.httpClient.get<PaggedResult<employeeDTO[]>>(this.baseURL+`GetAllEmployeesWithPagginations?searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`)
  }
}
