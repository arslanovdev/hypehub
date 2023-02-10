<script setup>
import { Toast } from "flowbite-vue";
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores";

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
  <Teleport to="body">
    <Toast
      v-if="alert"
      class="fixed top-24 md:right-24 z-50 md:transform-none md:left-auto left-1/2 transform -translate-x-1/2"
      :type="alert.type"
      closable
      @close="alertStore.clear()"
    >
      {{ alert.message }}
    </Toast>
  </Teleport>
</template>
