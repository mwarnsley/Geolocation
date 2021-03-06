<template>
    <div class="view-profile container">
        <div v-if="profile" class="card">
            <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
            <ul class="comments collection">
                <li v-for="(comment, index) in comments" :key="index">
                    <div class="deep-purple-text">{{ comment.from }}</div>
                    <div class="grey-text text-darken-2">{{ comment.content }}</div>
                </li>
                <form @submit.prevent="addComment">
                    <div class="field">
                        <label for="comment">Add a comment</label>
                        <input type="text" name="comment" v-model="newComment" />
                        <p v-if="feedback" class="red-text center">{{ feedback }}</p>
                    </div>
                </form>
            </ul>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import db from '@/firebase/init';

    export default {
        name: 'ViewProfile',
        data() {
            return {
                feedback: null,
                newComment: null,
                profile: null,
                user: null,
                comments: []
            };
        },
        created() {
            // We are grabbing the user data for the profile to add to it
            const ref = db.collection('users');
            // Get the current logged in user
            ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.user = doc.data();
                    this.user.id = doc.id;
                });
            });

            // Getting the profile data
            ref.doc(this.$route.params.id).get()
            .then(user => {
                this.profile = user.data();
            });

            /**
             * Grabbing the comments from the database
             * We are going to loop through them and unshift to put them in the array so they are in the right order
             */
            db.collection('comments').where('to', '==', this.$route.params.id)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.comments.unshift({
                            from: change.doc.data().from,
                            content: change.doc.data().content
                        });
                    }
                });
            });
        },
        methods: {
            addComment() {
                if (this.newComment) {
                    this.feedback = null;
                    // Add the comment to the database
                    db.collection('comments').add({
                        to: this.$route.params.id,
                        from: this.user.id,
                        content: this.newComment,
                        time: Date.now()
                    })
                    .then(() => {
                        this.newComment = null;
                    });
                } else {
                    this.feedback = 'You must enter a comment to add it';
                }
            }
        }
    }
</script>

<style>
    .view-profile .card {
        margin-top: 60px;
        padding: 20px;
    }
    .view-profile h2 {
        font-size: 2em;
        margin-top: 0;
    }
    .view-profile li {
        border-bottom: 1px solid #eee;
        padding: 10px;
    }
</style>

