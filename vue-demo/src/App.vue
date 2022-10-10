<script setup lang="ts">
import { BusinessService } from "type-injector-lib-demo-common-api";
import AuthenticatdScope from "./AuthenticatdScope.vue";
import { typeInjector } from "./type-injector";
import MessageDisplay from "./MessageDisplay.vue";

const businessService = typeInjector().get(BusinessService);
const message: string = businessService.createdValue;
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
  </header>

  <main class="container">
    <section>
      <h2>direct usage:</h2>
      <p>{{ message }}</p>
    </section>
    <section>
      <h2>usage in child:</h2>
      <MessageDisplay />
    </section>
    <section>
      <h2>usage in scope:</h2>
      <AuthenticatdScope>
        <MessageDisplay />
      </AuthenticatdScope>
    </section>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.container {
  display: flex;
  column-gap: 2em;
  row-gap: 2em;
  justify-content: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
