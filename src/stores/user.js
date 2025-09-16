import { defineStore } from 'pinia'
import router from '@/router'

import { DB, AUTH } from '@/utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import errorCodes from '@/utils/fbcodes'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

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
    getUserData: (state) => state.user,
    // isLoggedIn: (state) => !!state.user,
    getUserId: (state) => state.user.uid,
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
    async updateUserProfile(formData) {
      try {
        const userData = {
          ...this.user,
          ...formData,
          // email: this.user.email,
        }
        await updateDoc(doc(DB, 'users', this.getUserId), userData)
        this.setUser(userData)
        $toast.success('Update')
        return true
      } catch (error) {
        $toast.error(error.message)
      }
    },
    async signOut() {
      try {
        await AUTH.signOut()
        this.user = DEFAULT_USER
        this.auth = false
        router.push({ name: 'home' })
      } catch (error) {
        console.error('Error during logout:', error)
      }
    },

    async autoSignIn(uid) {
      try {
        const userData = await this.getUserProfile(uid)
        //update local state
        this.setUser(userData)
        return true
      } catch (error) {
        console.error('Error during auto sign-in:', error)
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
          firstname: response.user.firstname,
          lastname: response.user.lastname,
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
