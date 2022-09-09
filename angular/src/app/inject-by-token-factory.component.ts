import { Component, Inject, OnInit } from '@angular/core';
import { BusinessService } from 'type-injector-lib-demo-common-api';
import { BusinessServiceToken } from './type-injector.service';

@Component({
  selector: 'app-inject-by-token-factory',
  template: 'inject by global token factory: {{value}}',
  styles: [`:host { border-color: red; }`],
  styleUrls: ['./inject-variant.css'],
})
export class InjectByTokenFactoryComponent implements OnInit {
  value!: string;

  constructor(
    @Inject(BusinessServiceToken) private _businessService: BusinessService,
  ) {}

  ngOnInit() {
    this.value = this._businessService.createdValue;
  }
}
