<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center deep-purple-text">Login</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email" />
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password" />
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field">
                <button class="btn deep-purple">Login</button>
            </div>
        </form>
        <Spinner v-if="loading"/>
    </div>
</template>

<script>
    import Spinner from '@/components/shared/Spinner';
    import firebase from 'firebase';

    export default {
        name: 'Login',
        components: {
            Spinner
        },
        data() {
            return {
                email: null,
                password: null,
                feedback: null,
                loading: false
            }
        },
        methods: {
            login() {
                if (this.email && this.password) {
                    this.loading = true;
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        this.loading = false;
                        this.$router.push({
                            name: 'GMap'
                        });
                    })
                    .catch(err => {
                        this.loading = false;
                        this.feedback = err.message;
                    });
                    this.feedback = null;
                } else {
                    this.loading = false;
                    this.feedback = 'Please fill in both fields';
                }
            }
        }
    }
</script>

<style>
    .login {
        margin-top: 60px;
        max-width: 400px;
    }
    .login h2 {
        font-size: 2.4em;
    }
    .login .field {
        margin-bottom: 16px;
    }
</style>