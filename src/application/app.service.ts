import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): string {
    return 'ok';
  }

  health(): string {
    return 'ok';
  }
}
