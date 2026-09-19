import { HttpClient } from '@angular/common/http';
import { Service,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseWrapper } from '../../Models/designation_model';

@Service()
export class LeaveService {
    private httpClient:HttpClient=inject(HttpClient);
    private baseUrl:string='http://localhost:5103/api/v1/Leave/';

    getAllLeaves():Observable<APIResponseWrapper<leaveDTO[]>>{
    return this.httpClient.get<APIResponseWrapper<leaveDTO[]>>(this.baseUrl+'GetAllLeaves');
    }
    applyLeave(leave:leaveAddDTO):Observable<APIResponseWrapper<leaveAddDTO>>{
       return this.httpClient.post<APIResponseWrapper<leaveAddDTO>>(this.baseUrl+"AddNewLeave", leave)
    }
    editAppliedLeave(leaveToBeUpdated:leaveDTO,leaveId:number):Observable<APIResponseWrapper<leaveDTO>>{
        return this.httpClient.put<APIResponseWrapper<leaveDTO>>(this.baseUrl+`UpdateLeave?leaveId=${leaveId}`,leaveToBeUpdated)
    }
    removeLeave(leaveId:number):Observable<APIResponseWrapper<leaveDTO>>{
        return this.httpClient.delete<APIResponseWrapper<leaveDTO>>(this.baseUrl+`DeleteLeave?leaveId=${leaveId}`)
    }
    findLeaveById(leaveId:number):Observable<APIResponseWrapper<leaveDTO>>{
       return this.httpClient.get<APIResponseWrapper<leaveDTO>>(this.baseUrl+`GetALeave?leaveId=${leaveId}`)
    }
}