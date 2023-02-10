<script setup>
import { Dropdown } from "flowbite-vue";
import { useAccountStore } from "@/stores";
import { computed } from "vue";

const accountStore = useAccountStore();

const initials = computed(() => {
  const user = accountStore.user;
  const initials = user.name.charAt(0) + user.surname.charAt(0);

  return initials.toUpperCase();
});
</script>

<template>
  <Dropdown>
    <template #trigger>
      <button
        class="inline-flex cursor-pointer ml-2 sm:ml-4 overflow-hidden relative justify-center items-center w-9 h-9 bg-blue-200 rounded-full dark:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        type="button"
      >
        <span class="font-medium text-gray-600 dark:text-gray-300">
          {{ initials }}
        </span>
      </button>
    </template>
    <div
      style="right: -50px"
      class="absolute w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
    >
      <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
        <div class="truncate">
          {{ accountStore.user.name }} {{ accountStore.user.surname }}
        </div>
        <div class="font-medium truncate">
          {{ accountStore.user.email }}
        </div>
      </div>
      <ul
        class="py-1"
        role="none"
      >
        <li>
          <button
            type="button"
            class="block py-2 px-4 w-full text-sm text-left text-red-700 dark:hover:text-white dark:hover:bg-red-600 hover:bg-red-100"
            role="menuitem"
            @click="accountStore.logout()"
          >
            Выйти
          </button>
        </li>
      </ul>
    </div>
  </Dropdown>
</template>
