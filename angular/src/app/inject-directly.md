# Inject a ```TypeInjectorService``` and use it directly:
## 1. write a small wrapper service for type injector:
```typescript
@Injectable({
  providedIn: 'root'
})
export class TypeInjectorService {
  private typeInjector = TypeInjector.construct()
    .provideValue(injectToken.simpleValue, 'Hello Angular!')
    .provideFactory(injectToken.createdValue, {
      deps: [injectToken.simpleValue],
      create: (greetings: string) => `${greetings} Time is: ${new Date().toLocaleTimeString('en-EN')}`,
    })
    .provideImplementation(Logger, InfoLogger)
  .build();

  get<T>(token: InjectToken<T>) {
    return this.typeInjector.get(token);
  }
}
```
## 2. Use Angular to inject the TypeInjectorService
```typescript
@Component({
  selector: 'app-inject-directly',
  template: 'inject directly: {{value}}',
  styles: [`:host { border-color: blue; }`],
  styleUrls: ['./inject-variant.css'],
})
export class InjectDirectlyComponent implements OnInit {
  value!: string;

  private _businessService: BusinessService;

  constructor(
    private _typeInjector: TypeInjectorService,
  ) {}

  ngOnInit() {
    this._businessService = this._typeInjector.get(BusinessService);
    this.value = this._businessService.createdValue;
  }
}
```
To use ```TypeInjectorService``` directly in the constructor, you have to deactivate angular injection first.  
Otherwise you would get a 'No Provider'-Error:
```typescript
export const Nothing = new InjectionToken('injectExternal', {
  providedIn: 'root', factory: (...args: any) => undefined,
});

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
```
There is a more sophisticated example implementation that supports scopes: [TypeInjectorService](./type-injector.service.ts) along with the usage in the described way: [InjectDirectlyComponent](./inject-directly.component.ts).
