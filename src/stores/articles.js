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
        $toast.error(error.message)
        throw new Error(error)
      }
    },
    async loadLastArticles(docLimit) {
      try {
        if (this.adminLastVisible) {
          let oldArticles = this.adminArticles
          const q = query(
            articlesCollection,
            orderBy('timestamp', 'desc'),
            startAfter(this.adminLastVisible),
            limit(docLimit),
          )
          const querySnapshot = await getDocs(q)

          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
          const newArticles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

          this.adminArticles = [...oldArticles, ...newArticles]

          this.adminLastVisible = lastVisible
        }
        // const q = query(articlesCollection, orderBy('timestamp', 'desc'), limit(3))
      } catch (error) {
        $toast.error(error.message)
      }
    },

    async getAdminArticles(docLimit) {
      try {
        const q = query(articlesCollection, orderBy('timestamp', 'desc'), limit(docLimit))
        const querySnapshot = await getDocs(q)

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        const articles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        //Update articles
        this.adminArticles = articles
        this.adminLastVisible = lastVisible
      } catch (error) {
        console.error('Error fetching articles:', error)
        $toast.error('Error fetching articles')
        throw new Error(error.message)
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
    async deleteArticle(articleId) {
      const docRef = doc(DB, 'articles', articleId)
      await deleteDoc(docRef)
      this.adminArticles = this.adminArticles.filter((a) => a.id !== articleId)
      $toast.success('Deleted !!')
    },
  },
  getters: {
    // getArticles: (state) => state.articles,
    // getArticleById: (state) => (id) => state.articles.find(article => article.id === id)
  },
})
