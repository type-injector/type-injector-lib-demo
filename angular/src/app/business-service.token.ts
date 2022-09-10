import { InjectionToken } from '@angular/core';
import { BusinessService } from 'type-injector-lib-demo-common-api';
import { typeInject } from './global-type-injector';

export const BusinessServiceToken = new InjectionToken('businessService', {
  providedIn: 'root',
  factory: () => typeInject(BusinessService),
});
