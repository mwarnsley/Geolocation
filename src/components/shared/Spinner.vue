<template>
    <div class="spinner-overlay">
        <socket></socket>
    </div>
</template>

<style>
    .spinner-overlay {
        background-color: rgba(0, 0, 0, 0.1);
        bottom: 0;
        display: block;
        height: 100%;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        z-index: 99;
    }
    .spinner-overlay .spinner {
        left: 48%;
        position: absolute;
        top: 48%;
    }
</style>

 
<script>
  import { Socket } from 'vue-loading-spinner';

  export default {
    components: {
      Socket
    }
  }
</script>