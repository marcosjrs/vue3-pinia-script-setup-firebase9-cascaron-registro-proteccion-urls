<template>
  <urlDataForm @submit="onSubmit"></urlDataForm>
  <h3>Mis Urls <small>({{ userStore.user.value.email.toUpperCase() }})</small></h3>
  <v-list lines="one">
    <v-list-item
      v-for="urlData in urlsData"
      :key="urlData.short"
      :title="urlData.short"
      :subtitle="urlData.name"
    >

      <template v-slot:append>
        <v-btn
          icon="mdi-delete-outline"
          variant="text"
          @click="deleteItem(urlData)"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
  
  
  </v-list-item>
  </v-list>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '../stores/user';
  import { useUrlsDataStore } from '../stores/urlsdata';
  import urlDataForm from './urlDataForm.vue';
  

  const userStore = useUserStore();
  const urlsDataStore = useUrlsDataStore();
  const { urlsData } = storeToRefs(urlsDataStore);
  urlsDataStore.fetchUrlsData();

  const deleteItem = (urlData) => {
    urlsDataStore.deleteUrlData(urlData)
  }
  const onSubmit = async (data) => {
    urlsDataStore.addUrlData(data);
  }
</script>

<style scoped></style>