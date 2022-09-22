<script setup lang="ts">
import { Logger, TypeInjector } from "@type-injector/lib";
import {
  BusinessService,
  InfoLogger,
  injectToken,
} from "type-injector-lib-demo-common-api";

const injector = TypeInjector.construct()
  .provideImplementation(Logger, InfoLogger)
  .provideValue(injectToken.simpleValue, "Hello web component!")
  .provideFactory(injectToken.createdValue, {
    deps: [injectToken.simpleValue],
    create: (greeter) =>
      `${greeter} Time is: ${new Date().toLocaleTimeString()}`,
  })
  .build();

const businessService = injector.get(BusinessService);
const textContet = businessService.createdValue;
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
    <h1>
      {{ textContet }}
    </h1>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
