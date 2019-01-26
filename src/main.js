// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';

Vue.config.productionTip = false;

// Setting the app to null when it first starts up that way it only is created once
let app = null;

// Waiting for firebase auth to initialize before creating the application. Used for refreshing
firebase.auth().onAuthStateChanged(() => {
  // We are checking to see if the app has been created already so that it's only created once for the vue instance
  /* eslint-disable no-new */
  if (!app) {
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    });
  }
});
