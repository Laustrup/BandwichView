<script>
import { ref } from 'vue'
import { BForm, BFormInput, BButton, BFormGroup } from 'bootstrap-vue-next'
import { useUserStore } from '@/stores/userStore'
import loginRequest from '../../client/client'

export default {
  components: {
    BForm,
    BFormInput,
    BButton,
    BFormGroup
  },
  setup() {
    const userStore = useUserStore()
    const formData = ref({
      email: '',
      password: ''
    })

    const state = ref(null)
    const invalidFeedback = ref('')

    const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.value.email)) {
        state.value = false
        invalidFeedback.value = 'Please enter a valid email address'
        return false
      }

      if (formData.value.password.length < 6) {
        state.value = false
        invalidFeedback.value = 'Password must be at least 6 characters'
        return false
      }

      state.value = true
      return true
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if (validateForm()) {
        try {
          const response = await loginRequest.login({
            email: formData.value.email,
            password: formData.value.password
          })
          userStore.setUser({
            ...response.data.user,
            token: response.data.token
          })

          localStorage.setItem('token', response.data.token)

        } catch (error) {
          state.value = false
          invalidFeedback.value = error.response?.data?.message || 'Login failed'
        }
      }
    }

    return {
      formData,
      state,
      invalidFeedback,
      handleSubmit
    }
  }
}
</script>

<template>
  <div class="login-container">
    <h1 class="mb-4">Log in</h1>
    <BForm @submit="handleSubmit" class="login-form">
      <BFormGroup
        id="group-login-email"
        label="Email address:"
        label-for="login-email"
        :invalid-feedback="invalidFeedback"
      >
        <BFormInput
          id="login-email"
          v-model.trim="formData.email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </BFormGroup>

      <BFormGroup
        id="group_login_password"
        label="Password:"
        label-for="login-password"
        :invalid-feedback="invalidFeedback"
      >
        <BFormInput
          id="login-password"
          v-model="formData.password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </BFormGroup>

      <BButton type="submit" variant="primary" class="w-100">
        Log in
      </BButton>
    </BForm>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
