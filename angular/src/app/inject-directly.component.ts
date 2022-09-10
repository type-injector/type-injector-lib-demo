import { Component, Inject, OnInit } from '@angular/core';
import { BusinessService } from 'type-injector-lib-demo-common-api';
import { Nothing } from './nothing.token';
import { TypeInjectorService } from './type-injector.service';

@Component({
  selector: 'app-inject-directly',
  template: 'inject directly: {{value}}',
  styles: [`:host { border-color: blue; }`],
  styleUrls: ['./inject-variant.css'],
})
export class InjectDirectlyComponent implements OnInit {
  value!: string;

  constructor(
    typeInjector: TypeInjectorService,
    @Inject(Nothing) private _businessService = typeInjector.get(BusinessService),
  ) {}

  ngOnInit() {
    this.value = this._businessService.createdValue;
  }
}
