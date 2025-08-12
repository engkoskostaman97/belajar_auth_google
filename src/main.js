//import createApp dari vue
import { createApp } from 'vue'

//import App component
import App from './App.vue'

//import vue3GoogleLogin
import vue3GoogleLogin from 'vue3-google-login'

//create app
const app = createApp(App)

//use vue3GoogleLogin
app.use(vue3GoogleLogin, {
  clientId: '592123329335-nbp0626jlfsinmg957kqvmta09t4upso.apps.googleusercontent.com'
})

app.mount('#app')