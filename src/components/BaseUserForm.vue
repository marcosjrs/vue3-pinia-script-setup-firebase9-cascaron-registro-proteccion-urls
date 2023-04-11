<template>
  <v-row justify="center" align="center" class="container-form">
    <v-col xs="12" sm="8" md="6">
      <v-form ref="form" fast-fail @submit.prevent="handleSubmit($refs.form)">
        
        <v-text-field 
          label="Email" 
          v-model.trim="user.email" 
          :rules="[rules.required, rules.email]"
          placeholder="usuario@gmail.com" 
          name="email" 
          type="email">
        </v-text-field>

        <v-text-field 
          v-model.trim="user.password" 
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" 
          :rules="[rules.required, rules.min]"
          :type="showPass ? 'text' : 'password'" 
          name="password" 
          label="Contraseña" 
          hint="Al menos 8 caracteres"
          counter 
          autocomplete="false"
          @click:append="showPass = !showPass"
          required>
        </v-text-field>
        <!-- <pre> {{ $refs.form }} </pre> -->

        <v-btn :disabled="!!$refs.form?.errors?.length || userStore.inAction" type="submit" block class="mt-2" required>Submit</v-btn>
      </v-form>
    </v-col>
  </v-row>

  
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import {useUserStore} from '../stores/user'
  const emit = defineEmits(['submit'])
  const userStore = useUserStore();

  const user = reactive({ email:'user@email.com', password:'123456789' })
  const showPass = ref(false);
  const rules = {
    required: v => !!v || 'Campo requerido',
    min: v => (v && v.length > 7) || 'Al menos 8 caracteres',
    email: v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Debe ser una dirección válida',
  }

  const handleSubmit = (form) => {
    if(form.errors.length > 0) return
    const {email, password} = user;
    emit('submit',{email, password});
  }
</script>

<style scoped>
.container-form{
  height: calc(100vh - 60px);
}
</style>