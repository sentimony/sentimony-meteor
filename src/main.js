import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'
import EditProjectDialog from './components/Shared/EditProjectDialog'
import DeleteProjectDialog from './components/Shared/DeleteProjectDialog'
import ListItem from './components/Shared/ListItem'
import BtnAddProject from './components/Shared/BtnAddProject'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(Croppa)

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('edit-project-dialog', EditProjectDialog)
Vue.component('delete-project-dialog', DeleteProjectDialog)
Vue.component('list-item', ListItem)
Vue.component('btn-add-project', BtnAddProject)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyD1sTHBnX8x-0HfD8ak7yTZJFcZ_O_lf1M',
      authDomain: 'yehorpopov-db.firebaseapp.com',
      databaseURL: 'https://yehorpopov-db.firebaseio.com',
      projectId: 'yehorpopov-db',
      storageBucket: 'yehorpopov-db.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
    this.$store.dispatch('loadProjects')
  }
})