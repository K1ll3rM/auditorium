<template>
    <card class="bg-dark">
        {{ song.manifest.name }}
        <button class="btn btn-primary" @click="play()">Play</button>
    </card>
</template>

<style>
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import {Song} from "~/lib/Song";

export default Vue.extend({
    components: {Card},
    props: {
        song: {
            type: Object as Vue.PropType<Song>,
            required: true
        },
    },
    data() {
        return {

        }
    },
    methods: {
        play() {
            console.log(this.song.getSongsPath());
        }
    }
});
</script>