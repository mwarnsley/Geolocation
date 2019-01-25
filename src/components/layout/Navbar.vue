<template>
    <nav class="nav-extended">
        <div class="nav-wrapper deep-purple darken-1">
            <div class="container">
                <router-link class="brand-logo left" tag="a" to="/">Geolocation</router-link>
                <ul class="right">
                    <li><router-link class="active" tag="a" to="/signup">Signup</router-link></li>
                    <li><router-link class="active" tag="a" to="/login">Login</router-link></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>

</style>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {

            };
        }
    }
</script>