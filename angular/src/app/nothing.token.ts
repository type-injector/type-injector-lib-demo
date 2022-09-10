import { InjectionToken } from '@angular/core';

/**
 * prevent angular injection
 */
export const Nothing = new InjectionToken('injectExternal', {
  providedIn: 'root', factory: (...args: any) => undefined,
});
