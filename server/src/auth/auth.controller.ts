/* eslint-disable prettier/prettier */
import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenOTPDTO, LoginDTO, RegisterDTO, VerifyOTPDTO } from 'src/dto/auth.dto';

@Controller('/')
export class AuthController {
  constructor(private readonly Controller: AuthService) { }
  @Post('/register')
  Register(@Body() body: RegisterDTO) {
    return this.Controller.Register(body);
  }

  @HttpCode(200)
  @Post('/login')
  Login(@Body() body: LoginDTO) {
    return this.Controller.Login(body);
  }

  @HttpCode(200)
  @Post('/gen-otp')
  GenOTP(@Body() body: GenOTPDTO) {
    return this.Controller.GenOTP(body);
  }

  @HttpCode(200)
  @Post('/verify-otp')
  VerifyOTP(@Body() body: VerifyOTPDTO) {
    return this.Controller.VerifyOTP(body);
  }

  @HttpCode(200)
  @Post('/validate-otp')
  ValidateOTP(@Body() body: VerifyOTPDTO) {
    return this.Controller.ValidateOTP(body);
  }

  @HttpCode(200)
  @Post('/disable-otp')
  DisableOTP(@Body() body: GenOTPDTO) {
    return this.Controller.DisableOTP(body);
  }

  @HttpCode(200)
  @Post('/logout')
  Logout(@Body() body: GenOTPDTO) {
    return this.Controller.Logout(body);
  }
}
