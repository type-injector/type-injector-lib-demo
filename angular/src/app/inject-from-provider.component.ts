import { Component } from '@angular/core';
import { BusinessService } from 'type-injector-lib-demo-common-api';
import { provideBusinessService } from './business-service.provider';

@Component({
  selector: 'app-inject-from-provider',
  template: 'inject from provider: {{value}}',
  styles: [`:host { border-color: purple; }`],
  styleUrls: ['./inject-variant.css'],
  providers: [ provideBusinessService ],
})
export class InjectFromProviderComponent {
  value!: string;

  constructor(
    private _businessService: BusinessService,
  ) {}

  ngOnInit() {
    this.value = this._businessService.createdValue;
  }
}
