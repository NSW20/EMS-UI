export interface DesignationModel{
    designationId:number,
    title:string,
    departmentId:number
}
export interface DesignationAddModel{
    title:string,
    departmentId:number
}
export interface APIResponseWrapper<T>{
    statusCode:number,
    message:string,
    data:T,
    errors?:any
}