<template>
    <div>
        <h1>Testing</h1>
        <NuxtLink to="/">Test2</NuxtLink>
        <button @click="refreshSongs()">refresh</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    components: {},
    methods: {
        refreshSongs() {
            refreshSongs();
        }
    }
});


function refreshSongs() {
    console.log(window.api.sendSync('music-request'));
}
</script>
