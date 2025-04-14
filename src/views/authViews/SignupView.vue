<script>
import { ref } from 'vue'
import { BForm, BFormInput, BFormRadioGroup, BFormRadio, BButton, BFormGroup } from 'bootstrap-vue-next'
import { useUserStore } from '@/stores/userStore'
import signupRequest from '../../client/client'

export default {
  components: {
    BForm,
    BFormInput,
    BFormRadioGroup,
    BFormRadio,
    BButton,
    BFormGroup
  },
  setup() {
    const userStore = useUserStore()
    const formData = ref({
      type: '',
      tag: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      selected: 'artist',
    })

    const state = ref(null)
    const invalidFeedback = ref('')
    const isCollapsed = ref(false)

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.value.email)) {
        state.value = false
        invalidFeedback.value = 'Please enter a valid email address'
        return false
      }

      if (formData.value.password.length < 8) {
        state.value = false
        invalidFeedback.value = 'Password must be at least 8 characters'
        return false
      }

      if (formData.value.password !== formData.value.confirmPassword) {
        state.value = false
        invalidFeedback.value = 'Passwords do not match'
        return false
      }

      state.value = true
      return true
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if (validateForm()) {
        try {
          const response = await signupRequest.signup({
            type: formData.value.type,
            tag: formData.value.usertag,
            firstname: formData.value.firstname,
            lastname: formData.value.lastname,
            email: formData.value.email,
            password: formData.value.password,
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
      handleSubmit,
      isCollapsed,
      toggleCollapse
    }
  }
}
</script>

<template>
  <div class="login-container">
    <h1 class="mb-4">Sign up</h1>

    <BForm @submit="handleSubmit" class="login-form">
      <BFormGroup
        id="group-signup-type"
        label="User type:"
        label-for="signup-type"
      >
        <BFormRadioGroup v-model="formData.selected">
          <BFormRadio name="artist-radio" value="artist">Artist</BFormRadio>
          <BFormRadio name="organisation-radio" value="organisation">Organisation</BFormRadio>
        </BFormRadioGroup>
      </BFormGroup>

      <BFormGroup
        id="group-signup-tag"
        label="User tag:"
        label-for="signup-tag"
        :invalid-feedback="invalidFeedback"
      >
        <BFormInput
          id="signup-tag"
          v-model.trim="formData.tag"
          type="text"
          placeholder="Example: paul_mccartney"
          required
        />
      </BFormGroup>

      <BFormGroup
        id="group-signup-firstname"
        label="First name:"
        label-for="signup-firstname"
        :invalid-feedback="invalidFeedback"
      >
        <BFormInput
          id="signup-firstname"
          v-model.trim="formData.firstname"
          type="text"
          required
        />
      </BFormGroup>

      <BFormGroup
        id="group-signup-lastname"
        label="Last name:"
        label-for="signup-lastname"
        :invalid-feedback="invalidFeedback"
      >
        <BFormInput
          id="signup-lastname"
          v-model.trim="formData.lastname"
          type="text"
          required
        />
      </BFormGroup>

      <BFormGroup
        id="group-signup-email"
        label="Email address:"
        label-for="signup-email"
        :invalid-feedback="invalidFeedback"
      >
        <BFormInput
          id="signup-email"
          v-model.trim="formData.email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </BFormGroup>

      <BFormGroup
        id="group-signup-password"
        label="Password:"
        label-for="signup-password"
        :invalid-feedback="invalidFeedback"
      >
        <BFormInput
          id="signup-password"
          v-model="formData.password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </BFormGroup>

      <BFormGroup
        id="group-signup-password-confirm"
        label="Confirm Password:"
        label-for="signup-confirm-password"
        :invalid-feedback="invalidFeedback"
      >
        <BFormInput
          id="signup-password-confirm"
          v-model="formData.confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
        />
      </BFormGroup>

      <BButton type="submit" variant="primary" class="w-100">
        Sign up
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
  gap: 1rem; /* Provides equal spacing between form elements */
}
</style>
