interface AttendaceDTO {
  attendanceId: number;
  employeeId: number;
  date?: Date;
  checkIn?: string;
  checkOut?: string|null;
  status?: string;
}
interface AttendaceAddDTO {
  employeeId: number;
  date?: Date;
  checkIn?: string;
  checkOut?: string|null;
  status?: string;
}