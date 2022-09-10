# Inetgrate type injector lib into angular
Angular has an own injection system but this system knows nothing about services from ```type-injector-lib```.
So you have to connect those systems somehow. This example shows three different ways to integrate type injector into angular:

## 1st variant: [Inject via TypeInjectorService directly in the constructor](./src/app/inject-directly.md)
  * pros:
    - you can inject anything without further configuration
    - you can use angular scopes
    - you can inject services/constants from angular into TypeInjectorService
    - proper tree shaking from angular
  * cons:
    - you have to deactivate angular inject each time
    - you have an additional line of code to injecto the ```TypeInjectorService```

## 2nd variant: [Write an Angular ```InjectToken``` with factory](./src/app/inject-by-token-factory.md)
  * pros
    - you will have no dependency from your components to ```type-injector-lib```.
    - there are no tricks needed to prevent angular inject mechanism
    - proper tree shaking from angular
  * cons
    - no support for angular scopes (you can create multiple global injectors)
    - still requires additional configuration in each component (using ```@Inject(token)```)
    - you have to implement one token for each service you use

## 3rd variant: [Provider for your ```BusinessService``` factory](./src/app/inject-from-provider.md)
  * pros
    - you will have no dependency from your components to ```type-injector-lib```.
    - there are no tricks needed to prevent angular inject mechanism
    - it might use Angular scopes
    - you can inject services/constants from angular into TypeInjectorService
  * cons
    - you have to decide where to provide the factory
      - module/app level might lead to poor tree shaking
      - component level will need configuration in every component
    - you have to implement a factory for each service you use
