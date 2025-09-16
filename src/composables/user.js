import { ref } from 'vue'
import * as yup from 'yup'

import { useUserStore } from '@/stores/user'

export const updateUserProfile = () => {
  // Logic to update user profile
  const userStore = useUserStore()
  const firstname = ref(userStore.user.firstname)
  const lastname = ref(userStore.user.lastname)
  // const email = ref(userStore.user.email);

  const loading = ref(false)
  const schema = yup.object().shape({
    firstname: yup.string().required('First name is required').max(50, 'First name is too long'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
  })

  function onSubmit(value, { resetForm }) {
    loading.value = true
    userStore.updateUserProfile(value).finally(() => {
      loading.value = false
      // resetForm()
    })
  }

  return {
    firstname,
    lastname,
    //   email,
    loading,
    schema,
    onSubmit,
  }
}
