import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loaderStore", () => {
  const inAction = ref(false);
  return { inAction };
});
