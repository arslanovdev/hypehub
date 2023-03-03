<script setup>
import { storeToRefs} from "pinia";
import {useTestimonialStore} from "@/stores/index.js";
import {computed, ref, watch} from "vue";
import {Dropdown, ListGroup, ListGroupItem} from "flowbite-vue";
import UserAvatar from "@/components/UserAvatar.vue";
import SearchInput from "@/components/SearchInput.vue";
import DeleteModal from "@/components/DeleteModal.vue"
import EditTestimonialModal from "@/components/EditTestimonialModal.vue"
import {router} from "@/router";

// Get testimonials from the store and initialize search query
const testimonialStore = useTestimonialStore();
const { selectedTestimonial, testimonials } = storeToRefs(testimonialStore);
const searchQuery = ref("");
const projectSlug = router.currentRoute.value.params.slug;

// Filter testimonials based on search query
watch(searchQuery, async (searchQuery) => {
  await testimonialStore.getAllByProjectSlug(projectSlug, searchQuery);
})

// Delete modal methods
const isShowDeleteModal = ref(false);
const deleteTestimonialModalTitle = computed(() => {
  const declension = selectedTestimonial.value ?
      'этот отзыв' : `эти отзывы (${ selectedTestimonialIds.value.length })`
  return `Вы уверены что хотите удалить ${ declension }?`
});
const deleteTestimonial = () => {
  if (selectedTestimonial.value) {
    testimonialStore.delete(selectedTestimonial.value.id);
  } else {
    testimonialStore.deleteAll(projectSlug, selectedTestimonialIds.value);
  }
};
const closeDeleteModal = () => {
  isShowDeleteModal.value = false;
  // Remove testimonial selection
  selectedTestimonial.value = null;
};

// Edit modal methods
const isShowEditModal = ref(false);
const closeEditModal = () => {
  isShowEditModal.value = false;
  // Remove testimonial selection
  selectedTestimonial.value = null;
};

// Mass action methods
const selectedTestimonialIds = ref([]);
const toggleCheckAll = () => {
  selectedTestimonialIds.value = selectedTestimonialIds.value.length > 0 ?
        [] : testimonials.value.map(testimonial => testimonial.id);
}
const changeVerificationStatusTo = async (toStatus) => {
  const params = { 'is_verified': toStatus }
  await testimonialStore.updateAll(projectSlug, selectedTestimonialIds.value, params);
}
</script>

<template>
  <div class="relative">
    <div class="flex items-center justify-between pb-4">
      <Dropdown text="Действия">
        <template #trigger>
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span class="sr-only">Кнопка выбора массовых действий</span>
            Действия ({{ selectedTestimonialIds.length }})
            <svg
              class="w-3 h-3 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            /></svg>
          </button>
        </template>
        <ListGroup>
          <ListGroupItem @click="changeVerificationStatusTo(true)">
            <template #prefix>
              <svg
                class="w-4 h-4"
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </template>
            Пометить проверенными
          </ListGroupItem>
          <ListGroupItem @click="changeVerificationStatusTo(false)">
            <template #prefix>
              <svg
                class="w-4 h-4"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </template>
            Пометить непроверенными
          </ListGroupItem>
          <ListGroupItem @click="isShowDeleteModal = true">
            <template #prefix>
              <svg
                class="w-4 h-4"
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
            </template>
            Удалить
          </ListGroupItem>
        </ListGroup>
      </Dropdown>

      <div v-if="testimonials.length > 5">
        <label
          for="table-search"
          class="sr-only"
        >
          Поиск
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <SearchInput
            v-model="searchQuery"
            placeholder="Поиск отзыва..."
          />
        </div>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table
        v-if="!testimonials.loading"
        class="rounded-lg overflow-hidden w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md sm:rounded-lg bg-white dark:bg-gray-900"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              class="p-4"
            >
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  :checked="selectedTestimonialIds.length !== 0"
                  @change="toggleCheckAll"
                >
                <label
                  for="checkbox-all-search"
                  class="sr-only"
                >checkbox</label>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3"
            >
              Автор
            </th>
            <th
              scope="col"
              class="px-6 py-3"
            >
              Текст
            </th>
            <th
              scope="col"
              class="px-6 py-3"
            >
              Проверен
            </th>
            <th
              scope="col"
              class="px-6 py-3"
            >
              Действие
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  v-model="selectedTestimonialIds"
                  type="checkbox"
                  :value="testimonial.id"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                >
                <label
                  for="checkbox-table-search-1"
                  class="sr-only"
                >checkbox</label>
              </div>
            </td>
            <th
              scope="row"
              class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="flex items-center">
                <img
                  v-if="testimonial.author_photo"
                  class="w-9 h-9 rounded-full"
                  :src="testimonial.author_photo"
                  alt=""
                >
                <UserAvatar
                  v-else
                  :name="testimonial.author_name"
                />
                <div class="pl-3 max-w-[150px]">
                  <div class="text-base font-semibold truncate">
                    {{ testimonial.author_name }}
                  </div>
                </div>
              </div>
            </th>
            <td class="px-6 py-4">
              {{ testimonial.text }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div
                  class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"
                  :class="{ 'bg-red-400': !testimonial.is_verified }"
                />
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex">
                <button
                  class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                  type="button"
                  @click="selectedTestimonial = testimonial; isShowEditModal = true"
                >
                  <svg
                    class="w-5 h-5"
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <span class="sr-only">Редактировать</span>
                </button>
                <button
                  class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                  type="button"
                  @click="selectedTestimonial = testimonial; isShowDeleteModal = true"
                >
                  <svg
                    class="w-5 h-5"
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
                  <span class="sr-only">Удалить</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Teleport to="body">
    <!-- Delete testimonial modal -->
    <DeleteModal
      v-if="isShowDeleteModal"
      :title="deleteTestimonialModalTitle"
      @on-close-modal="closeDeleteModal"
      @on-click-delete-button="deleteTestimonial"
    />

    <!-- Edit testimonial modal -->
    <EditTestimonialModal
      v-if="isShowEditModal"
      :testimonial="selectedTestimonial"
      @on-close-modal="closeEditModal"
    />
  </Teleport>
</template>
