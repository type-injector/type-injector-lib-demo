# Provider for your ```BusinessService``` factory
## 1. Find your way to get a type injector
* write a small wrapper service as described in [inject directly](./inject-directly.md)
* create a global injector as described in [inject by token factory](./inject-by-token-factory.md)

## 2. Create a const with the provider definition:
```typescript
export const provideBusinessService: FactoryProvider = {
  provide: BusinessService,
  deps: [TypeInjectorService],
  useFactory: (typeInjector: TypeInjector) => typeInjector.get(BusinessService),
}
```

## 3. Provide it by using the const directly in the component you use it
```typescript
@Component({
  selector: 'app-inject-from-provider',
  template: 'inject from provider: {{value}}',
  styles: [`:host { border-color: purple; }`],
  styleUrls: ['./inject-variant.css'],
  providers: [ provideBusinessService ],
})
export class InjectFromProviderComponent {
  value!: string;

  constructor(
    private _businessService: BusinessService,
  ) {}

  ngOnInit() {
    this.value = this._businessService.createdValue;
  }
}
```
Of course you could also provide the factory in a module, but then you have to care about
scopes and tree shaking.
