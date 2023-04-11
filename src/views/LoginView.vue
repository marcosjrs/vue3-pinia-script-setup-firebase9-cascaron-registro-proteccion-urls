<template>
  <BaseUserForm @submit="onSubmit"></BaseUserForm>
</template>

<script setup>
import BaseUserForm from '../components/BaseUserForm.vue';
import { useUserStore } from '../stores/user';

import { useRouter } from "vue-router";
const router = useRouter();

const onSubmit = async (data) => {
  if ( await useUserStore().loginUser(data.email, data.password)) {
    router.push({ name: 'home' });
  }
}
</script>
