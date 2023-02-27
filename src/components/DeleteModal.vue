<script setup>
  import { Modal, Button } from "flowbite-vue";

  defineProps({
    title: {
      type: String,
      required: true
    }
  });

  defineEmits({
    onCloseModal: null,
    onClickDeleteButton: null
  })
</script>

<template>
  <Modal
    size="md"
    @close="$emit('onCloseModal')"
  >
    <template #header>
      <div class="text-xl font-medium text-gray-900 dark:text-white">
        {{ title }}
      </div>
    </template>
    <template #body>
      <form class="grid grid-cols-2 gap-2">
        <Button
          color="alternative"
          @click="$emit('onCloseModal')"
        >
          Отменить
        </Button>
        <Button
          type="button"
          color="red"
          outline
          @click="$emit('onClickDeleteButton'); $emit('onCloseModal')"
        >
          <svg
            class="inline w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Удалить
        </Button>
      </form>
    </template>
  </Modal>
</template>
