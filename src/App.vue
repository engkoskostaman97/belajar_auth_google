<script setup>

//import ref and onMounted
import { ref, onMounted } from 'vue';

//import googleTokenLogin and googleLogout
import { googleTokenLogin, googleLogout } from 'vue3-google-login';

//import axios
import axios from 'axios';

//state accessToken
const accessToken = ref(localStorage.getItem('accessToken'));

//state profile
const profile = ref(JSON.parse(localStorage.getItem('profile')));

//function fetchUserProfile
const fetchUserProfile = async (token) => {
  try {
    const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      params: {
        access_token: token,
      },
    });

    //assign response to state profile
    profile.value = res.data;

    //store response to localStorage
    localStorage.setItem('profile', JSON.stringify(res.data));

  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }
};

onMounted(() => {
  if (accessToken.value && !profile.value) {
    fetchUserProfile(accessToken.value);
  }
});

const login = () => {
  googleTokenLogin().then((response) => {

    //set state accessToken
    accessToken.value = response.access_token;

    //store accessToken to localStorage
    localStorage.setItem('accessToken', accessToken.value);

  })
}

const handleLogout = () => {

  //call googleLogout
  googleLogout();

  //set state accessToken and profile to null
  profile.value = null;
  accessToken.value = null;

  //remove accessToken and profile from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('profile');
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-0 rounded shadow-sm">
          <div class="card-header">
            <h5 class="card-title mb-0">Google Login with Vue 3</h5>
          </div>
          <div class="card-body">
            <div class="text-center">
              <div v-if="profile">
                <div class="text-center mb-3">
                  <img :src="profile.picture" class="rounded-circle bg-dark p-2 shadow" alt="User profile" />
                </div>
                <table class="table table-striped table-bordered">
                  <tbody>
                    <tr>
                      <td class="fw-bold">Full Name</td>
                      <td>{{ profile.name }}</td>
                    </tr>
                    <tr>
                      <td class="fw-bold">Email Address</td>
                      <td>{{ profile.email }}</td>
                    </tr>
                  </tbody>
                </table>
                <button class="btn btn-danger" @click="handleLogout">Log out</button>
              </div>
              <div v-else>
                <button class="btn btn-primary" @click="login">Login with Google</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>