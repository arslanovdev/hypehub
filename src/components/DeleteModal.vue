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
          @click="$emit('onClickDeleteButton'); $emit('onCloseModal')()"
        >
          Да
        </Button>
      </form>
    </template>
  </Modal>
</template>
