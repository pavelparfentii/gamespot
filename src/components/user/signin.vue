<template>
  <div class="signin_container">
    <!-- Loader -->
    <Form :validation-schema="formSchema" @submit="onSubmit">
      <h1 v-text="!type ? 'Sign In' : 'Register'"></h1>
      <div class="form-group">
        <Field name="email" v-slot="{ field, errorMessage, errors }" value="'pavelprfnt@gmail.com'">
          <input
            type="email"
            placeholder="Enter your email"
            :class="{ 'is-invalid': errors.length !== 0 }"
            v-bind="field"
          />
          <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
        </Field>
        <Field
          name="password"
          type="password"
          v-slot="{ field, errorMessage, errors }"
          value="'password'"
        >
          <input
            type="password"
            placeholder="Enter your password"
            :class="{ 'is-invalid': errors.length !== 0 }"
            v-bind="field"
          />
          <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
        </Field>
      </div>

      <button
        type="submit"
        class="btn mb-3 btn-block"
        v-text="!type ? 'Sign In' : 'Register'"
      ></button>
      <hr />
      <div class="form_swap" @click="type = !type">
        <span v-if="!type">Don't have an account?</span>
        <span v-else>Already have an account?</span>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'

const type = ref(false)

//AUTH Store
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const formSchema = yup.object({
  email: yup.string().email('Not a valid email').required('The email is required'),
  password: yup.string().min(6).required('The password is required'),
})

const onSubmit = (values, { resetForm }) => {
  userStore.register(values)
  //   resetForm()
}
</script>
