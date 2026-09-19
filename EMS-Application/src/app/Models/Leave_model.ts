interface leaveDTO
{
    leaveId:number,
    employeeId:number,
    fromDate:Date,
    toDate:Date,
    reason:string,
    leaveType:number,
    status?:number,
    approvedBy?:string
}
interface leaveAddDTO
{
    employeeId:number,
    fromDate:Date,
    toDate:Date,
    reason:string,
    leaveType:number,
    status?:number,
    approvedBy?:string
}
