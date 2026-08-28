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
interface ForgotPasswordModel{
    email:string
}
interface ResetPasswordModel{
    email:string,
    token:string,
    newPassword:string,
    confirmPassword:string
}