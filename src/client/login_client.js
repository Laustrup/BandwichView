import axios from 'axios'

export const item = {
  login(login) {
    return axios("login", login);
  }
}
