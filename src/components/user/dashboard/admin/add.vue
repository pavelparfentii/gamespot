<template>
  <h1>Add Article</h1>
  <hr />
  <Form @submit="onSubmit" :validation-schema="addArticleSchema">
    <div class="mb-4">
      <Field name="game" v-slot="{ field, errorMessage, errors }">
        <input
          type="text"
          placeholder="Name of the game"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
          v-bind="field"
        />
        <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
      </Field>
    </div>

    <div class="mb-4">
      <Field name="title" v-slot="{ field, errorMessage, errors }">
        <input
          type="text"
          placeholder="Title of the article"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
          v-bind="field"
        />
        <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
      </Field>
    </div>
    <div class="mb-4">
      <Field name="excerpt" v-slot="{ field, errorMessage, errors }">
        <textarea
          rows="5"
          placeholder="Excerpt of the article"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
          v-bind="field"
        ></textarea>
        <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
      </Field>
    </div>
    <!-- wysywyg -->
    <div class="mb-4">
      <WISYWIG @update="editUpdate" />
      <Field name="editor" v-slot="{ field, errorMessage, errors }" v-model="veditor">
        <input type="hidden" v-bind="field" id="veditor" />
        <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
      </Field>
    </div>

    <!-- rating -->
    <div class="mb-4">
      <Field name="rating" v-slot="{ field, errorMessage, errors }">
        <select class="form-select" :class="{ 'is-invalid': errors.length !== 0 }" v-bind="field">
          <option value="" disabled>Select rating</option>
          <option v-for="rating in ratingArray" :key="rating" :value="rating">{{ rating }}</option>
        </select>
        <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
      </Field>
    </div>
    <!-- //Image -->
    <div class="mb-4">
      <Field name="img" v-slot="{ field, errorMessage, errors }">
        <input
          type="text"
          placeholder="Image URL"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
          v-bind="field"
        />
        <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
      </Field>
    </div>
    <v-btn type="submit" variant="outlined"> Add article </v-btn>
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { addArticleSchema } from './addSchema'
import WISYWIG from '@/utils/wisywig.vue'
import { useArticlesStore } from '@/stores/articles'

const articlesStore = useArticlesStore()

const ratingArray = [0, 1, 2, 3, 4, 5]

const veditor = ref('')

function editUpdate(content) {
  veditor.value = content
}

const onSubmit = (values, { resetForm }) => {
  console.log(values)
}
</script>
