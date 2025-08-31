import { defineStore } from 'pinia'
import router from '@/router'
import { useUserStore } from './user'

import { DB } from '@/utils/firebase'
import {
  collection,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  deleteDoc,
} from 'firebase/firestore'

let articlesCollection = collection(DB, 'articles')

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    homeArticles: '',
    adminArticles: '',
    adminLastVisible: '',
  }),
  actions: {
    async fetchArticles() {
      try {
        const articlesCollection = collection(DB, 'articles')
        const articlesSnapshot = await getDocs(articlesCollection)
        this.articles = articlesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    },
    async addArticle(article) {
      const docRef = await addDoc(collection(DB, 'articles'), article)
      this.articles.push({ id: docRef.id, ...article })
    },
    async updateArticle(id, article) {
      const docRef = doc(DB, 'articles', id)
      await updateDoc(docRef, article)
      const index = this.articles.findIndex((a) => a.id === id)
      if (index !== -1) {
        this.articles[index] = { id, ...article }
      }
    },
    async deleteArticle(id) {
      const docRef = doc(DB, 'articles', id)
      await deleteDoc(docRef)
      this.articles = this.articles.filter((a) => a.id !== id)
    },
  },
  getters: {
    // getArticles: (state) => state.articles,
    // getArticleById: (state) => (id) => state.articles.find(article => article.id === id)
  },
})
