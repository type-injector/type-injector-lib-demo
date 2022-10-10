<script setup lang="ts">
import { BusinessService } from "type-injector-lib-demo-common-api";
import { typeInjector } from "./type-injector";

const businessService = typeInjector().get(BusinessService);
const message = businessService.createdValue;
</script>

<template>
  <p>{{ message }}</p>
</template>
