import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtServ: JwtService) {}
    
    async validateToken(token: string) {
        try {
            const validToken = this.jwtServ.verify(token, {
                secret: process.env.JWT_SECRET_KEY
            });
            if(validToken && validToken?.email !== '') {
                return validToken;
            }
        } catch(e: any) {
            throw new UnauthorizedException();
        }
    }

    generateToken(payload: any) {
        try {
            return this.jwtServ.sign(payload);
        } catch(e: any) {
            throw new InternalServerErrorException();
        }
    }
}