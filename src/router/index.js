import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import GMap from '@/components/home/GMap';
import Signup from '@/components/auth/Signup';
import Login from '@/components/auth/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});

// Creating the safeguard for the routes when it comes to protecting the private routes
router.beforeEach((to, _, next) => {
  // Check to see if the route requires for the user to be authenticated
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // Check the authorized state of the user
    const user = firebase.auth().currentUser;
    if (user) {
      /**
       * User is signed in so we can proceed to the private route
       * We use next by itself in order to proceed to that private route
       */
      next();
    } else {
      // If the user isn't signed in we use next to redirect to the login page
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
