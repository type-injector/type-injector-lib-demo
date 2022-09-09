(() => {
  // node_modules/type-injector-lib/dist/bundles/type-injector-lib.mjs
  var Logger = class {
    error(message, ...details) {
      console.error(message, ...details);
    }
  };
  var BasicTypeInjector = class {
    constructor({ instances, factories } = {}) {
      this._factories = /* @__PURE__ */ new Map();
      this._instances = /* @__PURE__ */ new Map();
      this._instancesInCreation = /* @__PURE__ */ new Map();
      this._initialLogger = new Logger();
      this._nameOf = (token) => {
        switch (typeof token) {
          case "symbol":
            return token.description;
          case "function":
            return token.name;
        }
      };
      this._instances = cloneMap(instances);
      this._factories = cloneMap(factories);
    }
    get(token) {
      return this._instances.has(token) ? this._instances.get(token) : this._create(token);
    }
    get logger() {
      if (this._instancesInCreation.has(Logger)) {
        return this._initialLogger;
      }
      const logger = this.get(Logger);
      Object.defineProperty(this, "logger", { value: logger });
      return logger;
    }
    getOptFactory(token) {
      const providedFactory = this._factories.get(token);
      if (providedFactory) {
        return providedFactory;
      }
      if (typeof token === "function") {
        const config = hasInjectConfig(token) ? token.injectConfig : { deps: [] };
        return {
          ...config,
          label: `${token.name}.injectConfig`,
          create: (...args) => new token(...args)
        };
      }
    }
    _getFactory(token) {
      const factory = this.getOptFactory(token);
      if (!factory) {
        throw new Error("could not find a factory to create token: " + this._nameOf(token));
      }
      return factory;
    }
    _markAsInCreation(token, factory, scopeIdent) {
      var _a, _b;
      if (this._instancesInCreation.has(token)) {
        const errorMessage = this._createCyclicErrorMessage(token, factory);
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }
      this._instancesInCreation.set(token, { factory });
      (_b = (_a = this.logger).info) === null || _b === void 0 ? void 0 : _b.call(_a, (scopeIdent ? `'${scopeIdent.description}'` : "top level injector") + ` starts creation of ${this._createDependencyEntryLog(token, factory)}`);
    }
    _finishedCreation(token) {
      var _a, _b;
      this._instancesInCreation.delete(token);
      (_b = (_a = this.logger).info) === null || _b === void 0 ? void 0 : _b.call(_a, `finished creation of ${this._nameOf(token)}`);
    }
    _abortedCreation(token) {
      var _a, _b;
      this._instancesInCreation.delete(token);
      token !== Logger && ((_b = (_a = this.logger).info) === null || _b === void 0 ? void 0 : _b.call(_a, `aborted creation of ${this._nameOf(token)}`));
    }
    _create(token) {
      const factory = this._getFactory(token);
      this._markAsInCreation(token, factory);
      const args = factory.deps.map((dep) => this.get(dep));
      const created = factory.create(...args);
      this._instances.set(token, created);
      this._finishedCreation(token);
      return created;
    }
    _createDependencyEntryLog(token, factory) {
      const tokenName = this._nameOf(token);
      const factoryName = factory.label || factory.create.name;
      let text = `
 -> ${tokenName}`;
      text += `
      factory: ${factoryName}`;
      return text;
    }
    _createCyclicErrorMessage(token, factory) {
      const dependencyPath = Array.from(this._instancesInCreation.entries()).concat([[token, { factory }]]).map(([token2, { factory: factory2 }]) => this._createDependencyEntryLog(token2, factory2)).join("\n");
      return `dependency cycle detected:${dependencyPath}

`;
    }
  };
  function hasInjectConfig(token) {
    return !!token.injectConfig;
  }
  function cloneMap(map) {
    const clone = /* @__PURE__ */ new Map();
    if (map) {
      if (map instanceof Map) {
        map.forEach((value, key) => clone.set(key, value));
      } else {
        Object.getOwnPropertySymbols(map).forEach((key) => {
          clone.set(key, map[key]);
        });
      }
    }
    return clone;
  }
  function declareInjectToken(type) {
    return Symbol.for(`TypeInjectorToken: ${typeof type === "string" ? type : type.name}`);
  }
  var TypeInjector = class extends BasicTypeInjector {
    static construct() {
      return new TypeInjectorBuilder();
    }
  };
  var TypeInjectorBuilder = class {
    constructor() {
      this._instances = /* @__PURE__ */ new Map();
      this._factories = /* @__PURE__ */ new Map();
    }
    provideValue(token, value) {
      this._instances.set(token, value);
      return this;
    }
    provideFactory(token, factory) {
      this._factories.set(token, factory);
      return this;
    }
    provideImplementation(token, impl) {
      const label = `provideImpl: ${impl.name}`;
      if (hasInjectConfig(impl)) {
        return this.provideFactory(token, {
          label,
          create: (...args) => new impl(...args),
          ...impl.injectConfig
        });
      } else {
        return this.provideFactory(token, {
          label,
          deps: [],
          create: () => new impl()
        });
      }
    }
    _closeBuilder() {
      const alreadyCreatedInjector = () => {
        throw new Error("injector already built - no further configuration/builds possible");
      };
      this.provideFactory = alreadyCreatedInjector;
      this.provideImplementation = alreadyCreatedInjector;
      this.provideValue = alreadyCreatedInjector;
      this.build = alreadyCreatedInjector;
      this._factories = /* @__PURE__ */ new Map();
      this._instances = /* @__PURE__ */ new Map();
    }
    build() {
      const injector = new TypeInjector({
        instances: this._instances,
        factories: this._factories
      });
      this._closeBuilder();
      return injector;
    }
  };
  var InjectorScope = class extends BasicTypeInjector {
    constructor(ident, _parent, config) {
      super(config);
      this.ident = ident;
      this._parent = _parent;
      this._ownInstances = Array.from(this._instances.values());
    }
    static construct() {
      return {
        withIdent: (ident) => ({
          fromParent: (parent) => {
            return new class extends TypeInjectorBuilder {
              provideFactory(token, factory) {
                return super.provideFactory(token, { ...factory, scope: ident });
              }
              build() {
                const childInjector = new InjectorScope(ident, parent, {
                  instances: this._instances,
                  factories: this._factories
                });
                this._closeBuilder();
                return childInjector;
              }
            }();
          }
        })
      };
    }
    getOptFactory(token) {
      return this._factories.get(token) || this._parent.getOptFactory(token);
    }
    _createInOwnScope(token, factory) {
      this._markAsInCreation(token, factory);
      const args = factory.deps.map((dep) => this.get(dep));
      const created = factory.create(...args);
      this._ownInstances.push(created);
      this._instances.set(token, created);
      this._finishedCreation(token);
      return {
        instance: created,
        fromParentScope: false
      };
    }
    _useInstanceFromParentScope(token) {
      const refFromParent = this._parent.get(token);
      this._instances.set(token, refFromParent);
      return {
        instance: refFromParent,
        fromParentScope: true
      };
    }
    _markAsInCreation(token, factory, scopeIdent = this.ident) {
      super._markAsInCreation(token, factory, scopeIdent);
    }
    _hasOwnDependencies(token, factory) {
      var _a, _b, _c, _d;
      token !== Logger && ((_b = (_a = this.logger).info) === null || _b === void 0 ? void 0 : _b.call(_a, `start dependency check of ${this._nameOf(token)} in '${this.ident.description}'`));
      this._markAsInCreation(token, factory);
      const dependencyInScope = factory.deps.find((dep) => {
        const instance = this.get(dep);
        return this._ownInstances.includes(instance);
      });
      this._abortedCreation(token);
      token !== Logger && ((_d = (_c = this.logger).info) === null || _d === void 0 ? void 0 : _d.call(_c, `dependency check result: '${this._nameOf(token)}' ${dependencyInScope ? `depends on '${this._nameOf(dependencyInScope)}' provided` : "has *no* overridden dependencies"} in '${this.ident.description}'`));
      return !!dependencyInScope;
    }
    _createWithSource(token) {
      const providedFactory = this._factories.get(token);
      if (providedFactory) {
        return this._createInOwnScope(token, providedFactory);
      }
      const parentFactory = this._parent.getOptFactory(token);
      if (parentFactory && this._hasOwnDependencies(token, parentFactory)) {
        return this._createInOwnScope(token, parentFactory);
      } else {
        return this._useInstanceFromParentScope(token);
      }
    }
    _createDependencyEntryLog(token, factory) {
      var _a;
      return super._createDependencyEntryLog(token, factory) + `
      scope: '${((_a = factory.scope) === null || _a === void 0 ? void 0 : _a.description) || "top level injector"}'`;
    }
    _create(token) {
      return this._createWithSource(token).instance;
    }
  };

  // node_modules/type-injector-lib-demo-common-api/dist/es2020/inject-token.const.js
  var injectToken = {
    simpleValue: declareInjectToken("simple value"),
    createdValue: declareInjectToken("created value")
  };

  // node_modules/type-injector-lib-demo-common-api/dist/es2020/business-service.js
  var BusinessService = class {
    constructor(createdValue, simpleValue, logger) {
      this.createdValue = createdValue;
      this.logger = logger;
    }
    logCreatedValue() {
      var _a, _b;
      (_b = (_a = this.logger).info) === null || _b === void 0 ? void 0 : _b.call(_a, this.createdValue);
    }
  };
  BusinessService.injectConfig = {
    deps: [injectToken.createdValue, injectToken.simpleValue, Logger]
  };

  // node_modules/type-injector-lib-demo-common-api/dist/es2020/info-logger.js
  var InfoLogger = class extends Logger {
    constructor() {
      super(...arguments);
      this.info = (msg, ...details) => {
        console.log(msg, details);
      };
    }
  };

  // src/app-text.component.scoped.js
  var AppTextElement = class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      const topLevelInjector = TypeInjector.construct().provideValue(injectToken.simpleValue, "Hello web component!").provideFactory(injectToken.createdValue, {
        deps: [injectToken.simpleValue],
        create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString()}`
      }).build();
      const injector = InjectorScope.construct().withIdent(Symbol.for("detailed logging")).fromParent(topLevelInjector).provideImplementation(Logger, InfoLogger).build();
      const businessService = injector.get(BusinessService);
      const textContet = document.createTextNode(businessService.createdValue);
      shadowRoot.append(textContet);
    }
  };
  customElements.define("app-text", AppTextElement);
})();
