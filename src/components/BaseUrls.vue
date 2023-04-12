<template>
  <h3>Mis Urls <small>({{ userStore.user.value.email.toUpperCase() }})</small></h3>
  <v-list lines="one">
    <v-list-item
      v-for="urlData in urlsData"
      :key="urlData.short"
      :title="urlData.short"
      :subtitle="urlData.name"
    ></v-list-item>
  </v-list>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '../stores/user';
  import { useUrlsDataStore } from '../stores/urlsdata';

  const userStore = useUserStore();
  const urlsDataStore = useUrlsDataStore();
  const { urlsData } = storeToRefs(urlsDataStore);
  urlsDataStore.fetchUrlsData();
</script>

<style scoped></style>