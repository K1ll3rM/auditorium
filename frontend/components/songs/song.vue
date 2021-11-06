<template>
    <card class="bg-dark">
        {{ song.manifest.name }}
    </card>
</template>

<style>
</style>
<script lang="ts">
import {Song, Songs} from "@/shared/Song";
import Card from "~/components/Card.vue";
import Vue from "vue";

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
    }
});
</script>