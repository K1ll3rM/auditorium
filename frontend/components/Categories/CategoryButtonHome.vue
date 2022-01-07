<template>
    <a @click="select()">
        <CategoryButtonStyle :class="buttonClass" id="home">{{ content ? content : 'home' }}</CategoryButtonStyle>
    </a>
</template>

<script lang="ts">
import Vue from "vue";
import CategoryButtonStyle from "~/components/Categories/CategoryButtonStyle.vue";

export default Vue.extend({
    components: {CategoryButtonStyle},
    props: {
        buttonClass: String,
        content: String
    },
    created() {
    },
    data() {
        return {
        }
    },
    methods: {
        select() {
            this.$music.currentCategory = null;
            this.$emit('select');
        }
    }
});
</script>
