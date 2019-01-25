<template>
    <div class="signup container">
        <form @submit.prevent="signup" class="card-panel">
            <h2 class="center deep-purple-text">Signup</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email"/>
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password"/>
            </div>
            <div class="field">
                <label for="alias">Alias:</label>
                <input type="text" name="alias" v-model="alias"/>
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Signup</button>
            </div>
        </form>
    </div>
</template>

<style>
    .signup {
        margin-top: 60px;
        max-width: 400px;
    }
    .signup h2 {
        font-size: 2.4em;
    }
    .signup .field {
        margin-bottom: 16px;
    }
</style>

<script>
    import slugify from 'slugify';
    import db from '@/firebase/init';
    import firebase from 'firebase';

    export default {
        name: 'Signup',
        data() {
            return {
                email: null,
                password: null,
                alias: null,
                feedback: null,
                slug: null
            };
        },
        methods: {
            signup() {
                if (this.alias && this.email && this.password) {
                    // We are going to slugify the password to send to the database
                    this.slug = slugify(this.alias, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    });
                    // Looping through the slugs in the database to check and make sure the one entered is not already in use
                    const ref = db.collection('users').doc(this.slug);
                    ref.get().then(doc => {
                        if (doc.exists) {
                            this.feedback = 'This alias already exists';
                        } else {
                            // Creating the user if they don't already exists
                            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                            .catch(err => {
                                this.feedback = err.message;
                            });
                        }
                    });
                } else {
                    this.feedback = 'You must enter all fields';
                }
            }
        }
    }
</script>
