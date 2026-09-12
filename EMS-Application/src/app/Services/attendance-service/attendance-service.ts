import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseWrapper } from '../../Models/designation_model';

@Service()
export class AttendanceService {
  private httpClient: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:5103/api/v1/Attendace/';

  getAllAttendance(): Observable<APIResponseWrapper<AttendaceDTO[]>> {
    return this.httpClient.get<APIResponseWrapper<AttendaceDTO[]>>(
      this.baseUrl + 'GetAllAttendace',
    );
  }
  applyAttendance(addAttendace: AttendaceAddDTO): Observable<APIResponseWrapper<AttendaceDTO>> {
    return this.httpClient.post<APIResponseWrapper<AttendaceDTO>>(
      this.baseUrl + 'AddAttendace',
      addAttendace,
    );
  }
  chekoutAttendance(
    updateAttendace: AttendaceDTO,
    attendanceId: number,
  ): Observable<APIResponseWrapper<AttendaceDTO>> {
    return this.httpClient.put<APIResponseWrapper<AttendaceDTO>>(
      this.baseUrl + `UpdateAttendace?attendaceId=${attendanceId}`,
      updateAttendace,
    );
  }
  removeAttendance(attendanceId: number): Observable<APIResponseWrapper<AttendaceDTO>> {
    return this.httpClient.delete<APIResponseWrapper<AttendaceDTO>>(
      this.baseUrl + `RemoveAttendace?attendanceId=${attendanceId}`,
    );
  }
  getAttendance(attendanceId: number): Observable<APIResponseWrapper<AttendaceDTO>> {
    return this.httpClient.get<APIResponseWrapper<AttendaceDTO>>(
      this.baseUrl + `FindAttendaceById?attendanceId=${attendanceId}`,
    );
  }
}
