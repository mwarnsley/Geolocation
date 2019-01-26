<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import db from '@/firebase/init';

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
                db.collection('users').get()
                .then(users => {
                    users.docs.forEach(doc => {
                        const data = doc.data();
                        if (data.geolocation) {
                            const marker = new google.maps.Marker({
                                position: {
                                    lat: data.geolocation.lat,
                                    lng: data.geolocation.lng
                                },
                                map
                            });
                            // Add the click event to the marker
                            marker.addListener('click', () => {
                                this.$router.push({ name: 'ViewProfile', params: { id: doc.id } });
                            });
                        }
                    });
                });
            }
        },
        mounted() {
            // Get the current user from firebase
            const user = firebase.auth().currentUser;
            // Get the users geolocation
            if (navigator.geolocation) {
                /**
                 * Get the current position of the user for the map
                 * getCurrentPosition takes in 3 parameters
                 * @param {callback function for the position}
                 * @param {callback function for the error}
                 * @param {options that we can use for getting the current position}
                 */
                navigator.geolocation.getCurrentPosition(pos => {
                    // Getting the latitude and longitude from the position coordinates
                    const latitude = pos.coords.latitude;
                    const longitude = pos.coords.longitude;

                    this.lat = latitude;
                    this.lng = longitude;

                    // Find the user record and then update the geocoordinates
                    db.collection('users').where('user_id', '==', user.uid).get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            db.collection('users').doc(doc.id).update({
                                geolocation: {
                                    lat: latitude,
                                    lng: longitude
                                }
                            });
                        });
                    })
                    .then(() => {
                        this.renderMap();
                    });
                }, err => {
                    console.log('Error: ', err);
                    this.renderMap();
                }, {
                    maximumAge: 60000,
                    timeout: 3000
                });
            } else {
                // Position the center by the default values
                this.renderMap();
            }
        }
    }
</script>

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