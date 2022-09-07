import { ComponentHarness, HarnessQuery, AsyncFactoryFn, LocatorFnResult } from '@angular/cdk/testing';

export class AuthenticatedScopeHarness extends ComponentHarness {
  static hostSelector = 'app-authenticated-scope';

  async getToken(): Promise<string> {
    const tokenOutput = await this.locatorFor('.token')();
    const token = await tokenOutput.text();
    return token;
  }

  get<T extends (HarnessQuery<any> | string)[]>(...queries: T): Promise<LocatorFnResult<T>> {
    return this.locatorFor(...queries)();
  }
}
