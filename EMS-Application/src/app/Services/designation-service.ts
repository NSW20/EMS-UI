import { Service,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponseWrapper, DesignationAddModel, DesignationModel } from '../Models/designation_model';
@Service()
export class DesignationService {
   private httpClient:HttpClient=inject(HttpClient);
    private readonly serviceBaseUrl:string='http://localhost:5103/api/V1/Designation/';

    GetAllDesignations():Observable<APIResponseWrapper<DesignationModel[]>>{
        return this.httpClient.get<APIResponseWrapper<DesignationModel[]>>(this.serviceBaseUrl+'GetAllDesignations');
    }
    AddDesignation(addModel:DesignationAddModel):Observable<APIResponseWrapper<DesignationModel>>{
        return this.httpClient.post<APIResponseWrapper<DesignationModel>>(this.serviceBaseUrl+'AddDesignation',addModel);
    }
     UpdateDesignation(updateModel:DesignationModel,designationId:number):Observable<APIResponseWrapper<DesignationModel>>{
        return this.httpClient.put<APIResponseWrapper<DesignationModel>>(this.serviceBaseUrl+`UpdateDesignation?designationId=${designationId}`,updateModel);
    }
    RemoveDesignation(designationId:number):Observable<APIResponseWrapper<string>>{
        return this.httpClient.delete<APIResponseWrapper<string>>(this.serviceBaseUrl+`DeleteDesignation?designationId=${designationId}`);
    }
    FindADesignation(designationId:number):Observable<APIResponseWrapper<DesignationModel>>{
        return this.httpClient.get<APIResponseWrapper<DesignationModel>>(this.serviceBaseUrl+`GetADesignation?designationId=${designationId}`);
    }
}
