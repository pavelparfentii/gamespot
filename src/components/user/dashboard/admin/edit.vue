<template>
  <h1>Edit Article</h1>
  <hr />

  <!-- <div class="text-center m-3" v-show="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div> -->

  <Form @submit="onSubmit" :validation-schema="addArticleSchema" v-if="!loading">
    <div class="mb-4">
      <Field name="game" v-model="article.game" v-slot="{ field, errorMessage, errors }">
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
      <Field name="title" v-model="article.title" v-slot="{ field, errorMessage, errors }">
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
      <Field name="excerpt" v-model="article.excerpt" v-slot="{ field, errorMessage, errors }">
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
      <WISYWIG @update="editUpdate" :content="article.editor" />
      <Field name="editor" v-model="veditor" v-slot="{ field, errorMessage, errors }">
        <input type="hidden" v-bind="field" id="veditor" />
        <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
      </Field>
    </div>

    <!-- rating -->
    <div class="mb-4">
      <Field name="rating" v-model="article.rating" v-slot="{ field, errorMessage, errors }">
        <select class="form-select" :class="{ 'is-invalid': errors.length !== 0 }" v-bind="field">
          <option value="" disabled>Select rating</option>
          <option v-for="rating in ratingArray" :key="rating" :value="rating">{{ rating }}</option>
        </select>
        <div v-if="errorMessage" class="input_alert">{{ errorMessage }}</div>
      </Field>
    </div>
    <!-- //Image -->
    <div class="mb-4">
      <Field name="img" v-model="article.img" v-slot="{ field, errorMessage, errors }">
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
    <v-btn type="submit" variant="outlined" :disabled="loading" :loading="loading">
      Edit article
    </v-btn>
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { addArticleSchema } from './addSchema'
import WISYWIG from '@/utils/wisywig.vue'
import { useArticlesStore } from '@/stores/articles'

//toasts
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id

const articlesStore = useArticlesStore()

const ratingArray = [0, 1, 2, 3, 4, 5]

const veditor = ref('')

const loading = ref(true)

const article = ref({})

function editUpdate(content) {
  veditor.value = content
}

const onSubmit = (values, { resetForm }) => {
  loading.value = true
  articlesStore.updateArticle(articleId, values).finally(() => {
    loading.value = false
  })
}

//getArticleById
articlesStore
  .getArticleById(articleId)
  .then((response) => {
    article.value = { ...response }
    editUpdate(response.editor)
    loading.value = false
  })
  .catch((error) => {
    $toast.error(error.message)
  })
</script>
