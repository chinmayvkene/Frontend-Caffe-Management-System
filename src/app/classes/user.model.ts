export class UserRegister{
    //id:number = 0;
    name:string = '';
    username:string = '';
    email:string = '';
    phone:string = '';
    password:string = '';
    role:string = '';
}

export class ConfirmRegister{
    //userid:number = 0;
    username:string = '';
    otptext:string = '';
}

export class ResetPassword{
    username: string = '';
    oldpassword:string = '';
    newpassword: string = '';
}

export class UpdatePassword{
    username: string = '';
    password: string = '';
    otptext: string = '';
}

export class UserCredentials{
    username: string = '';
    password: string = '';
}

export class LoginResponse{
    token: string = '';
    refreshToken: string = '';
}