<template>
  <urlDataForm @submit="onSubmit"></urlDataForm>
  <h3>Mis Urls <small>({{ userStore.user.value.email.toUpperCase() }})</small></h3>


  <v-list lines="one">
    <v-list-item v-for="urlData in urlsData" :key="urlData.short" :title="urlData.short" :subtitle="urlData.name" >
      <template v-slot:title>
        {{urlData.short}}
        <v-btn v-if="!urlData.editing" icon="mdi-file-edit-outline" variant="text" @click="urlData.editing = true" ></v-btn>          
        <v-btn v-if="urlData.editing" icon="mdi-close-thick" variant="text" @click="urlData.editing = false" ></v-btn>       
        <v-btn v-if="!urlData.editing" icon="mdi-delete-outline" variant="text" @click="showDeleteItemDialog(urlData)" ></v-btn>   
      </template>
      <template v-slot:subtitle>
        <div v-if="!urlData.editing"> {{urlData.name}}</div>
        <div v-else>
          <urlDataForm :data="urlData" @submit="onUpdateDataUrl($event); urlData.editing = false"></urlDataForm>
        </div>  
      </template>   
    </v-list-item>
  </v-list>


  <div class="text-center">
    <v-dialog v-model="dialog" width="auto" >
      <v-card>
        <v-card-text>
          <div>Vas a borrar la url:  {{urlToDelete.name}}</div>
          ¿Estás de acuerdo?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="dialog = false"
          >
            No
          </v-btn>
          <v-btn
            color="red-darken-1"
            variant="text"
            @click="deleteItem"
          >
            Sí
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>



</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '../stores/user';
  import { useUrlsDataStore } from '../stores/urlsdata';
  import urlDataForm from './urlDataForm.vue';
  import { ref } from 'vue';
  

  const dialog = ref(false);
  const urlToDelete = ref({});

  const userStore = useUserStore();
  const urlsDataStore = useUrlsDataStore();
  const { urlsData } = storeToRefs(urlsDataStore);
  urlsDataStore.fetchUrlsData();

  const showDeleteItemDialog = (data) => {
    urlToDelete.value = data;
    dialog.value = true;
  }

  const deleteItem = () => {
    urlsDataStore.deleteUrlData(urlToDelete.value);
    dialog.value = false;
  }

  const onSubmit = async (data) => {
    urlsDataStore.addUrlData(data);
  }
  const onUpdateDataUrl = async (data) => {
    urlsDataStore.updateUrlData({...data, editing: false});
  }
</script>

<style scoped></style>