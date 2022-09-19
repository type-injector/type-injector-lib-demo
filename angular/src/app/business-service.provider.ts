import { FactoryProvider } from '@angular/core';
import { TypeInjector } from '@type-injector/lib';
import { BusinessService } from 'type-injector-lib-demo-common-api';
import { TypeInjectorService } from './type-injector.service';

export const provideBusinessService: FactoryProvider = {
  provide: BusinessService,
  deps: [TypeInjectorService],
  useFactory: (typeInjector: TypeInjector) => typeInjector.get(BusinessService),
}
