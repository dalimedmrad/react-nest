/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDTO {
    @IsNotEmpty()
    fullname: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class LoginDTO {

    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class GenOTPDTO {


    @IsNotEmpty()
    id: string;
}


export class VerifyOTPDTO {

    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    token: string;
}