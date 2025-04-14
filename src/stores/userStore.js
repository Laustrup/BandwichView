import { ref } from 'vue'

const user = ref(null)
const isAuthenticated = ref(false)

const setUser = (userData) => {
  user.value = userData
  isAuthenticated.value = true
}

const clearUser = () => {
  user.value = null
  isAuthenticated.value = false
}

const getUser = () => user.value
const getIsAuthenticated = () => isAuthenticated.value

export const useUserStore = () => {
  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    getUser,
    getIsAuthenticated
  }
}
