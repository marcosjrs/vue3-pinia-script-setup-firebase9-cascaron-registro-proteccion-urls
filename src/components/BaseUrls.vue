<template>
  <urlDataForm @submit="onSubmit"></urlDataForm>
  <h3>Mis Urls <small>({{ userStore.user.value.email.toUpperCase() }})</small></h3>
  <v-list lines="one">
    <v-list-item v-for="urlData in urlsData" :key="urlData.short" :title="urlData.short" :subtitle="urlData.name" >
      <template v-slot:title>
        {{urlData.short}}
        <v-btn v-if="!urlData.editing" icon="mdi-file-edit-outline" variant="text" @click="urlData.editing = true" ></v-btn>          
        <v-btn v-if="urlData.editing" icon="mdi-close-thick" variant="text" @click="urlData.editing = false" ></v-btn>          
      </template>
      <template v-slot:subtitle>
        <div v-if="!urlData.editing"> {{urlData.name}}</div>
        <div v-else>
          <urlDataForm :data="urlData" @submit="onUpdateDataUrl($event); urlData.editing = false"></urlDataForm>
        </div>  
      </template> 
      <template v-slot:append>
        <v-btn v-if="!urlData.editing" icon="mdi-delete-outline" variant="text" @click="deleteItem(urlData)" ></v-btn>
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
  const onUpdateDataUrl = async (data) => {
    urlsDataStore.updateUrlData({...data, editing: false});
  }
</script>

<style scoped></style>