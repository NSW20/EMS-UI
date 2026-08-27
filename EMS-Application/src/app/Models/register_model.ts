interface Register{
    name:string,
    username:string,
    email:string,
    phone:string,
    password:string,
    confirmPassword:string,
    role:string
}
interface Login{
     email:string,
    password:string,
}
interface ForgotPassword{
    email:string
}
interface ResetPassword{
    email:string,
    token:string,
    password:string,
    confirmPassword:string
}