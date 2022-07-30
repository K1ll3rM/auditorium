<template>
    <a @click="select(category)" v-if="category.id !== 'unsorted' || category.songs.length">
        <CategoryButtonStyle :class="buttonClass" :id="category.id">{{
                content ? content : category.manifest.name
            }}
        </CategoryButtonStyle>
    </a>
</template>

<script lang="ts">
import {Category} from "~~/lib/Category";
import CategoryButtonStyle from "~~/components/Categories/CategoryButtonStyle.vue";
import {PropType} from "vue";

export default {
    name: "CategoryButton",
    components: {CategoryButtonStyle},
    props: {
        category: {
            type: Object as PropType<Category>,
            required: true
        },
        buttonClass: String,
        content: String
    },
    created() {
    },
    data() {
        return {}
    },
    methods: {
        select(category: Category) {
            this.$music.setCurrentCategory(category);
            this.$emit("select");
        }
    }
};
</script>
