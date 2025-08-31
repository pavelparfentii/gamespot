import { ref } from 'vue'
//Auth Store
import { useUserStore } from '@/stores/user'

//firebase
import { AUTH } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const firstLoad = () => {
  // Logic for first load
  const userStore = useUserStore()
  const isLoading = ref(true)

  onAuthStateChanged(AUTH, async (user) => {
    if (user) {
      await userStore.autoSignIn(user.uid)
    }
    isLoading.value = false
  })

  return { isLoading }
}

export const isAuth = () => {
  let user = AUTH.currentUser
  if (!user) return '/signin'
  return true
}

export const isLoggedIn = () => {
  let user = AUTH.currentUser
  if (user) return '/'
  return true
}
