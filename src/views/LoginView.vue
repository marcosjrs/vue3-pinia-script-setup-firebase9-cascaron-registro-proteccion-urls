<template>
  <BaseForm @submit="onSubmit"></BaseForm>
</template>

<script setup>
import BaseForm from '../components/BaseForm.vue';
import { useUserStore } from '../stores/user';

import { useRouter } from "vue-router";
const router = useRouter();

const onSubmit = async (data) => {
  if ( await useUserStore().loginUser(data.email, data.password)) {
    router.push({ name: 'home' });
  }
}
</script>
