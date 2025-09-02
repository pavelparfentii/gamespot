import { defineStore } from 'pinia'
import router from '@/router'
import { useUserStore } from './user'
import { useToast } from 'vue-toast-notification'

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
  Timestamp,
} from 'firebase/firestore'

const $toast = useToast()

let articlesCollection = collection(DB, 'articles')

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    homeArticles: '',
    adminArticles: '',
    adminLastVisible: '',
  }),
  actions: {
    async updateArticle(id, formData) {
      try {
        const docRef = doc(DB, 'articles', id)
        await updateDoc(docRef, {
          ...formData,
        })
        /// SHOW TOASTS
        $toast.success('Updated !!')
        return true
      } catch (error) {
        $toast.success(error.message)
        throw new Error(error)
      }
    },

    async fetchArticles() {
      try {
        const articlesCollection = collection(DB, 'articles')
        const articlesSnapshot = await getDocs(articlesCollection)
        this.articles = articlesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    },

    async getArticleById(id) {
      try {
        const articleDoc = await getDoc(doc(DB, 'articles', id))
        if (!articleDoc.exists()) {
          throw new Error('Article not found')
        } else {
          return articleDoc.data()
        }
      } catch (error) {
        console.error('Error fetching article by ID:', error)
        router.push({ name: 'not_found' })
      }
    },

    async addArticle(formData) {
      //get user data
      const userStore = useUserStore()
      const user = userStore.getUserData

      try {
        const newArticle = doc(articlesCollection)
        await setDoc(newArticle, {
          ...formData,
          owner: { uid: user.uid, firstname: `${user.firstname}`, lastname: `${user.lastname}` },
          timestamp: serverTimestamp(),
        })
      } catch (error) {
        console.error('Error adding article:', error)
      }
      router.push({ name: 'admin_articles', query: { reload: true } })
      return true
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
