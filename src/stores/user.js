import { defineStore } from 'pinia'
import router from '@/router'

import { DB, AUTH } from '@/utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const DEFAULT_USER = {
  uid: null,
  email: null,
  firstname: null,
  lastname: null,
  isAdmin: null,
}

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    user: DEFAULT_USER,
    auth: null,
  }),
  getters: {
    // isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async register(formData) {},
    // setUser(user) {
    //   this.user = user
    // },
    // clearUser() {
    //   this.user = null
    // },
  },
})
