<template>
    <div>
        <div class="buttons" v-if="!$music.currentCategory">
            <CategoryButton v-for="(category, id) in categories" :key="id" class="me-2" :category="category" @select="select()"/>
        </div>

        <div class="breadcrumb">
            <div class="breadcrumb-item" v-if="$music.currentCategory">
                <CategoryButtonHome button-class="btn-sm" :key="null" @select="select()"/>
            </div>
            <div class="breadcrumb-item" v-for="category in breadcrumb">
                <CategoryButton button-class="btn-sm" :key="category.id" :category="category" @select="select()"/>
            </div>
            <div class="breadcrumb-item" v-if="$music.currentCategory">
                {{ $music.currentCategory.manifest.name }}
            </div>
        </div>

        <div v-if="this.$music.currentCategory">
            <h2 v-if="this.$music.currentCategory.manifest.fullName">{{ this.$music.currentCategory.manifest.fullName }}</h2>
            <p v-if="this.$music.currentCategory.manifest.description">{{ this.$music.currentCategory.manifest.description }}</p>
        </div>

        <div v-if="$music.currentCategory && $music.currentCategory.children">
            <CategoryButton v-if="$music.currentCategory.parent" class="me-2" :key="$music.currentCategory.parent.id" :category="$music.currentCategory.parent" content=".." @select="select()"/>
            <CategoryButtonHome v-else class="me-2" :key="null" content=".." @select="select()"/>
            <CategoryButton v-for="(category) in $music.currentCategory.children" class="me-2" :key="category.id" :category="category" @select="select()"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
    max-width: 90%;
}

.breadcrumb-item {
    line-height: 2rem;

    .btn {
        height: 2rem;
    }

    &::before {
        font-size: 20px;
    }
}
</style>

<script lang="ts">
import Vue from "vue";
import {Categories, Category} from "~/lib/Category";
import None from "~/components/songs/none.vue";
import Song from "~/components/songs/song.vue";
import CategoryButton from "~/components/Categories/CategoryButton.vue";
import CategoryButtonHome from "~/components/Categories/CategoryButtonHome.vue";

export default Vue.extend({
    components: {CategoryButtonHome, CategoryButton, Song, None},
    props: {
        categories: {
            type: Object as Vue.PropType<Categories>,
            required: true
        },
    },
    created() {
    },
    data() {
        return {
            breadcrumb: [] as Category[]
        }
    },
    methods: {
        select() {
            if(this.$music.currentCategory) {
                this.breadcrumb = this.$music.currentCategory.getBreadcrumb();
            }
            else {
                this.breadcrumb = [];
            }

            this.$root.$emit('category.change');
        }
    }
});
</script>
