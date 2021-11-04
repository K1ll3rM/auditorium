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

export default {
    components: {Card},
    data() {
        return {
            songs: <Songs>{}
        }
    },
}
</script>