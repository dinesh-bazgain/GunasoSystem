import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'supersecret', // set in .env for production
    });
  }

  async validate(payload: any) {
    // this object will be attached to req.user in controllers
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
