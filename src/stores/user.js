import { defineStore } from 'pinia'
import router from '@/router'

import { DB, AUTH } from '@/utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import errorCodes from '@/utils/fbcodes'

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
    setUser(user) {
      this.user = { ...this.user, ...user }
      this.auth = true
    },
    async getUserProfile(uid) {
      const userDoc = await getDoc(doc(DB, 'users', uid))
      if (userDoc.exists()) {
        return userDoc.data()
      } else {
        throw new Error('User not found')
      }
    },

    async signIn(formData) {
      try {
        this.loading = true

        const response = await signInWithEmailAndPassword(AUTH, formData.email, formData.password)

        const getUserData = await this.getUserProfile(response.user.uid)

        //update local state
        if (getUserData) {
          this.setUser(getUserData)
        }

        //redirect user
        router.push({ name: 'dashboard' })
      } catch (error) {
        throw new Error(errorCodes(error.code))
      } finally {
        this.loading = false
      }
    },

    async register(formData) {
      try {
        this.loading = true

        //register user
        const response = await createUserWithEmailAndPassword(
          AUTH,
          formData.email,
          formData.password,
        )

        //add user to db
        const newUser = {
          uid: response.user.uid,
          email: formData.email,
          // firstname: null,
          // lastname: null,
          isAdmin: false,
        }
        // update user state
        this.setUser(newUser)

        await setDoc(doc(DB, 'users', response.user.uid), newUser)

        //redirect user
        router.push({ name: 'dashboard' })
      } catch (error) {
        throw new Error(errorCodes(error.code))
      } finally {
        this.loading = false
      }
    },
    // setUser(user) {
    //   this.user = user
    // },
    // clearUser() {
    //   this.user = null
    // },
  },
})
