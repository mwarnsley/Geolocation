<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<style>
    .google-map {
        background: #ffffff;
        height: 100%;
        left: 0;
        margin: 0 auto;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
    }
</style>

<script>
    import firebase from 'firebase';

    export default {
        name: 'GMap',
        data() {
            return {
                lat: 53,
                lng: 2
            };
        },
        methods: {
            renderMap() {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: this.lat, lng: this.lng },
                    zoom: 6,
                    maxZoom: 15,
                    minZoom: 3,
                    streetViewControl: false
                });
            }
        },
        mounted() {
            this.renderMap();
            console.log(firebase.auth().currentUser);
        }
    }
</script>
