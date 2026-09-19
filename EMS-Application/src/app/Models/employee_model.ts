
interface employeeDTO{
employeeId:number,
fullName:string,
email:string,
phone:string,
dateOfJoining:Date,
departmentId:number,
designationId:number,
salary:string,
status:string,
userId:string,
managerId?:number
}

interface employeeAddDTO{
fullName:string,
email:string,
phone:string,
dateOfJoining:Date,
departmentId:number,
designationId:number,
salary:string,
status:string,
userId?:string,
managerId:number
}