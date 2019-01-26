<template>
    <nav class="nav-extended">
        <div class="nav-wrapper deep-purple darken-1">
            <div class="container">
                <router-link class="brand-logo left" tag="a" :to="{ name: 'GMap' }">Geolocation</router-link>
                <ul class="right">
                    <li v-if="!user"><router-link class="active" tag="a" :to="{ name: 'Signup' }">Signup</router-link></li>
                    <li v-if="!user"><router-link class="active" tag="a" :to="{ name: 'Login' }">Login</router-link></li>
                    <li v-if="user"><a>{{ user.email }}</a></li>
                    <li v-if="user"><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'Navbar',
        data() {
            return {
                user: null
            };
        },
        created() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.user = user;
                } else {
                    this.user = null;
                }
            });
        },
        methods: {
            logout() {
                firebase.auth().signOut()
                .then(() => {
                    this.$router.push({
                        name: 'Login'
                    });
                });
            }
        }
    }
</script>