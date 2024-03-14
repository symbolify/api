import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtServ: JwtService) {}
    
    async validateToken(token: string) {
        console.log('****** ', token);
        // return this.jwtServ.verify(token, process.env.JWT_SECRET_KEY);
        try {
            // console.log(this.jwtServ.verify(token, {
            //     secret: `${process.env.JWT_SECRET_KEY}`
            // }));
            const abc =  this.jwtServ.verify(token, {
                secret: `${process.env.JWT_SECRET_KEY}`
            });
            console.log('&&&&&&&&&& ', abc);
        } catch(e: any) {
            console.log("#######",e);
            return e.message;
        }
        
        return true;
    }

    generateToken(payload: any) {
        try {
            return this.jwtServ.sign(payload);
        } catch(e: any) {
            console.log(e);
            return e.message;
        }
    }
}