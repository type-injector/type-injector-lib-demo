import { Component, Inject } from '@angular/core';
import { AuthToken } from './auth-token.const';
import { TypeInjectorService } from './type-injector.service';

@Component({
  selector: 'app-authenticated-scope',
  templateUrl: `./authenticated-scope.component.html`,
  styleUrls: ['./authenticated-scope.component.css'],
  providers: [
    { provide: AuthToken, useFactory: () => `Token${Math.round(Math.random() * 9)}` },
    TypeInjectorService, // it's scoped now
  ]
})
export class AuthenticatedScopeComponent {
  constructor(
    @Inject(AuthToken) readonly authToken: string,
  ) {}
}
