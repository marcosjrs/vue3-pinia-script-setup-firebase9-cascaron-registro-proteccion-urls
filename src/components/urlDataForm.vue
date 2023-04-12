<template>
  <v-form ref="form" fast-fail @submit.prevent="handleSubmit($refs.form)">
    <v-text-field
      label="Nueva Url" 
      v-model.trim="name" 
      :rules="[rules.required, rules.min]"
      placeholder="https://dominio.com" 
      :append-icon="'mdi-content-save-outline'" 
      @click:append="handleSubmit($refs.form)"
      name="name" 
      type="name">
    </v-text-field>
  </v-form>  
</template>

<script setup>
  import { ref } from 'vue';
  const props = defineProps({
    data: {
      type: Object,
      required: false
    }
  });
  const emit = defineEmits(['submit'])

  const name = ref(props.data?props.data.name:'');
  const rules = {
    required: v => !!v || 'Campo requerido',
    min: v => (v && v.length > 14) || 'Al menos 15 caracteres',
  }

  const handleSubmit = (form) => {
    if(form.errors.length > 0) return;
    const dataToSave = {...props.data, name: name.value};
    emit('submit',dataToSave);
  }
</script>

<style scoped>
</style>