<script setup lang="ts">
import { provide } from "vue";
import { typeInjector, typeInjectorToken } from "./type-injector";
import { InjectorScope } from "@type-injector/lib";
import { injectToken } from "type-injector-lib-demo-common-api";

provide(
  typeInjectorToken,
  InjectorScope.construct()
    .withIdent(Symbol.for("AuthenticatedScope"))
    .fromParent(typeInjector())
    .provideValue(injectToken.simpleValue, "Authenticated")
    .build()
);
</script>

<style scoped>
.AuthenticatedScope {
  display: block;
  border: 3px solid #41b883;
  padding: 0.5em;
}
header {
  color: #41b883;
}
</style>

<template>
  <div class="AuthenticatedScope">
    <header>AuthenticatedScope</header>
    <slot></slot>
  </div>
</template>
