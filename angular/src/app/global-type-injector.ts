import { InjectFactory, InjectToken, Logger, TypeInjector } from 'type-injector-lib';
import { InfoLogger, injectToken } from 'type-injector-lib-demo-common-api';

export class LazyTypeInjector extends TypeInjector {
  private initialize() {
    const typeInjector = TypeInjector.construct()
      .provideValue(injectToken.simpleValue, 'Hello Angular!')
      .provideFactory(injectToken.createdValue, {
        deps: [injectToken.simpleValue],
        create: (greetings: string) => `${greetings} Time is: ${new Date().toLocaleTimeString('en-EN')}`,
      })
      .provideImplementation(Logger, InfoLogger)
    .build();

    this.get = typeInjector.get.bind(typeInjector);
    this.getOptFactory = typeInjector.getOptFactory.bind(typeInjector);

    return typeInjector;
  }

  override get<T>(token: InjectToken<T>) {
    return this.initialize().get(token);
  }

  override getOptFactory<T>(token: InjectToken<T>): InjectFactory<T> | undefined {
    return this.initialize().getOptFactory(token);
  }
}

export const globalTypeInjector = new LazyTypeInjector();

export function typeInject<T>(injectToken: InjectToken<T>): T {
  return globalTypeInjector.get(injectToken);
}
