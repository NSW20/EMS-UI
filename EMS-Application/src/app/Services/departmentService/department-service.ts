import { Service,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponseWrapper } from '../../Models/designation_model';

@Service()
export class DepartmentService {
    private readonly apiBaseUrl:string='http://localhost:5103/api/V1/Department/';
    private httpClient:HttpClient=inject(HttpClient);
    
    getAllDepartment():Observable<APIResponseWrapper<DepartmentDTO[]>>{
        return this.httpClient.get<APIResponseWrapper<DepartmentDTO[]>>(this.apiBaseUrl+'GetAllDepartment');
    }
    addDepartment(addModel:DepartmentAddDTO):Observable<APIResponseWrapper<DepartmentDTO>>{
        return this.httpClient.post<APIResponseWrapper<DepartmentDTO>>(this.apiBaseUrl+'AddNewDepartment',addModel);
    }
    updateDepartment(updateModel:DepartmentDTO,deptId:number):Observable<APIResponseWrapper<DepartmentDTO>>{
        return this.httpClient.put<APIResponseWrapper<DepartmentDTO>>(this.apiBaseUrl+'UpdateDepartment',updateModel);
    }
    removeDepartment(deptId:number):Observable<APIResponseWrapper<string>>{
        return this.httpClient.delete<APIResponseWrapper<string>>(this.apiBaseUrl+`DeleteDepartment?deptId=${deptId}`);
    }
    getDepartment(deptId:number):Observable<APIResponseWrapper<DepartmentDTO>>{
            return this.httpClient.get<APIResponseWrapper<DepartmentDTO>>(this.apiBaseUrl+`GetADepartment?deptId=${deptId}`);
   }
}
