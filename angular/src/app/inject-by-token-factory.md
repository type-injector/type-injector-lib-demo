# Write an Angular ```InjectToken``` with factory
## 1. create an global type injector instance
```typescript
const globalInjector = TypeInjector.construct()
  .provideValue(injectToken.simpleValue, 'Hello Angular!')
  .provideFactory(injectToken.createdValue, {
    deps: [injectToken.simpleValue],
    create: (greetings: string) => `${greetings} Time is: ${new Date().toLocaleTimeString('en-EN')}`,
  })
  .provideImplementation(Logger, InfoLogger)
.build();
```
## 2. create an inject token with a factory using the global type injector
```typescript
export const BusinessServiceToken = new InjectionToken('businessService', {
  providedIn: 'root',
  factory: () => globalInjector.get(BusinessService),
});
```
## 3. use the token to inject your service
```typescript
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
```
There is a more sophisticated example implementation with lazy initialization and providing a convinient method to inject value: [globalTypeInjector](./global-type-injector.ts) along with the usage in the described way: [BusinessServiceToken](./business-service.token.ts) and [InjectByTokenFactoryComponent](./inject-by-token-factory.component.ts).
