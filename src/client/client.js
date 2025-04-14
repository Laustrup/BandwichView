import axios from 'axios';
const BANDWICH_PERSISTENCE_URL = import.meta.env.VITE_BACKEND_URL;

const loginPath = `${BANDWICH_PERSISTENCE_URL}/login`;
const signupPath = `${BANDWICH_PERSISTENCE_URL}/signup`;
const artistPath = `${BANDWICH_PERSISTENCE_URL}/artist`;
const eventPath = `${BANDWICH_PERSISTENCE_URL}/event`;
const bandPath = `${BANDWICH_PERSISTENCE_URL}/band`;
const organisationPath = `${BANDWICH_PERSISTENCE_URL}/organisation`;

const item = {
  login(loginData) {
    return axios.post(loginPath, loginData);
  },
  signup(signupData) {
    return axios.post(signupPath, signupData);
  },
  artist: {
    get(artistId) {
      return axios.get(`${artistPath}/${artistId}`);
    },
    getAll() {
      return axios.get(artistPath);
    },
    post(artistData) {
      return axios.post(artistPath, artistData);
    },
  },
  event: {
    get(eventId) {
      return axios.get(`${eventPath}/${eventId}`);
    },
    getAll() {
      return axios.get(eventPath);
    },
    post(eventData) {
      return axios.post(eventPath, eventData);
    },
  },
  band: {
    get(bandId) {
      return axios.get(`${bandPath}/${bandId}`);
    },
    getAll() {
      return axios.get(bandPath);
    },
    post(bandData) {
      return axios.post(bandPath, bandData);
    },
  },
  organisation: {
    get(organisationId) {
      return axios.get(`${organisationPath}/${organisationId}`);
    },
    getAll() {
      return axios.get(organisationPath);
    },
    post(organisationData) {
      return axios.post(organisationPath, organisationData);
    },
  },
};

export default item;
