import { Component, Inject, OnInit } from '@angular/core';
import { BusinessService } from 'type-injector-lib-demo-common-api';
import { Nothing, TypeInjectorService } from './type-injector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title!: string;

  constructor(
    typeInjector: TypeInjectorService,
    @Inject(Nothing) private readonly businessService: BusinessService = typeInjector.get(BusinessService),
  ) {}

  ngOnInit() {
    this.title = this.businessService.createdValue;
  }
}
