<script setup>
import ThemeSwitcher from "./ThemeSwitcher.vue";
import UserMenu from "./UserMenu.vue";
import Logo from "./Logo.vue";
</script>

<template>
  <header
    class="py-3 md:py-4 sticky top-0 z-40 flex-none w-full mx-auto bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800"
  >
    <div
      class="flex flex-wrap items-center justify-between px-4 mx-auto max-w-8xl"
    >
      <div class="flex items-center">
        <div class="flex items-center justify-between">
          <Logo />
        </div>
      </div>
      <div class="flex md:order-2">
        <div class="flex items-center">
          <ThemeSwitcher />
          <UserMenu />
        </div>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex ml-2 sm:ml-4 items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="sidebar"
          aria-expanded="false"
        >
          <span class="sr-only">Открыть главое меню</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        id="navbar-sticky"
        class="items-center justify-between hidden min-w-full sm:min-w-0 md:flex md:w-auto md:order-1 flex-1 md:justify-end"
      >
        <ul
          class="flex flex-col mt-4 md:mr-2 md:flex-row md:space-x-8 md:mt-0 md:text-sm font-semibold"
        >
          <li>
            <router-link
              :to="{ name: 'project-list' }"
              class="block py-2 pl-3 pr-4 md:p-0 text-sm text-gray-900 hover:bg-blue-600 hover:text-white md:hover:bg-transparent md:hover:text-blue-600 dark:text-gray-300 dark:md:hover:text-blue-500 rounded"
            >
              Мои проекты
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
