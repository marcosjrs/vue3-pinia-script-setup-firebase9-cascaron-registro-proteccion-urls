<script setup>
import { RouterView, useRouter } from 'vue-router';
import { useUserStore } from './stores/user';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();

const {isLogged} = storeToRefs(userStore);

const logout = ()=>{
  userStore.logoutUser();
  router.push({name:'login'});
}

</script>

<template>
  <header>
    <v-toolbar density="compact">
      <v-toolbar-title>Mi Aplicación</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isLogged" to="/" icon>
        <v-icon>mdi-home-account</v-icon> 
        <v-tooltip activator="parent" location="top">Home</v-tooltip>
      </v-btn>
      <v-btn v-if="!isLogged" to="/login" icon>
        <v-icon>mdi-login</v-icon>
        <v-tooltip activator="parent" location="top">Login</v-tooltip>
      </v-btn>
      <v-btn v-if="isLogged" @click="logout()"   icon>
        <v-icon>mdi-logout</v-icon>
        <v-tooltip activator="parent" location="top">Logout</v-tooltip>
      </v-btn>
      <v-btn v-if="!isLogged" to="/register" icon>
        <v-icon>mdi-account-plus</v-icon>
        <v-tooltip activator="parent" location="top">Registro</v-tooltip>
      </v-btn>

    </v-toolbar>
  </header>
  <v-container>
    <RouterView />
  </v-container>
</template>

<style scoped>

</style>
