<template>
    <card>
        Songs
    </card>
</template>

<style>
</style>
<script lang="ts">
import {Songs} from "@/shared/Song";
import Card from "~/components/Card.vue";
import Vue from "vue";

export default Vue.extend({
    components: {Card},
    data() {
        return {
            songs: <Songs>{}
        }
    },
    methods: {
        refreshSongs() {
            this.songs = window.api.sendSync('music-request');
            console.log(this.$refs);
        }
    }
});

console.log(window.api);
</script>