import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthenticatedScopeComponent } from './authenticated-scope.component';
import { InjectByTokenFactoryComponent } from './inject-by-token-factory.component';
import { InjectDirectlyComponent } from './inject-directly.component';
import { IntegrationVariantsComponent } from './integration-variants.component';

@NgModule({
  declarations: [
    AppComponent,
    InjectDirectlyComponent,
    InjectByTokenFactoryComponent,
    IntegrationVariantsComponent,
    AuthenticatedScopeComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
