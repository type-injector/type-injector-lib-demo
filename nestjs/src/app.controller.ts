import { Controller, Get } from '@nestjs/common';
import { BusinessService } from 'type-injector-demo-common-api';

@Controller()
export class AppController {
  constructor(private readonly _businessService: BusinessService) {}

  @Get()
  getHello(): string {
    return this._businessService.createdValue;
  }
}
