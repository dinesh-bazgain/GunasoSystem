import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! This is Dinesh Bajgain from Gunaso System. How can I help you?';
  }
}
