/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GenOTPDTO, LoginDTO, RegisterDTO, VerifyOTPDTO } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as bcrypt from "bcryptjs"
import { generateSecretRandom32 } from 'src/lib/secret-base32';
import * as OTPAuth from "otpauth";


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  async Register(body: RegisterDTO) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existUser) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    const hash = await bcrypt.hash(body.password, 10);
    const payload = {
      fullname: body.fullname,
      email: body.email,
      password: hash,
      opt_enabled: false,
    };

    await this.prisma.user.create({
      data: payload,
    });

    return { message: 'success' };
  }

  async Login(body: LoginDTO) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(body.password, existUser.password)
    if (!isMatch) {
      throw new HttpException('invalid password ', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      id: existUser.id,
      fullname: existUser.fullname,
      email: existUser.email,
      otp_validate: existUser.opt_validated,
      opt_enabled: existUser.opt_enabled,
    }
    return payload;
  }

  async GenOTP(body: GenOTPDTO) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const opt_secret = generateSecretRandom32()
    const totp = new OTPAuth.TOTP({
      issuer: "ACME",
      label: "dali2Fa",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: opt_secret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    });
    const opt_authurl = totp.toString(); // or 'OTPAuth.URI.stringify(totp)'
    const newUser = await this.prisma.user.update({
      where: {
        id: body.id
      },
      data: {
        opt_authurl, opt_secret
      }
    })


    return newUser;
  }

  async VerifyOTP(body: VerifyOTPDTO) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const totp = new OTPAuth.TOTP({
      issuer: "ACME",
      label: "dali2Fa",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: existUser.opt_secret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    });
    const delta = totp.validate({ token: body.token });

    if (delta == null) {
      throw new HttpException('invalide token', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: body.id
      },
      data: {
        opt_enabled: true
      }
    })
    return newUser;
  }

  async ValidateOTP(body: VerifyOTPDTO) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const totp = new OTPAuth.TOTP({
      issuer: "ACME",
      label: "dali2Fa",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: existUser.opt_secret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    });
    const delta = totp.validate({ token: body.token });

    if (delta == null) {
      throw new HttpException('invalide token', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: body.id
      },
      data: {
        opt_validated: true
      }
    })
    return newUser;
  }
  async DisableOTP(body: GenOTPDTO) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }


    const newUser = await this.prisma.user.update({
      where: {
        id: body.id
      },
      data: {
        opt_enabled: false,
        opt_validated: false
      }
    })
    return newUser;
  }

  async Logout(body: GenOTPDTO) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: body.id
      },
      data: {
        opt_validated: false
      }
    })
    return newUser;
  }
}
