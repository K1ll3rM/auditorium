<template>
    <div>
        <div class="buttons" v-if="!$music.currentCategory">
            <CategoryButton v-for="(category, id) in categories" :key="id" class="me-2" :category="category"/>
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
<!--                <CategoryButton button-class="btn-sm" :key="$music.currentCategory.id" :category="$music.currentCategory" @select="select()"/>-->
            </div>
        </div>

<!--        <div v-if="$music.currentCategory && $music.currentCategory.parent">-->
<!--            <CategoryButton v-for="(category, id) in $music.currentCategory.parent.children" :key="category.id" :category="category"  @select="select()"/>-->
<!--        </div>-->
        <div v-if="$music.currentCategory && $music.currentCategory.children">
            <CategoryButton v-for="(category) in $music.currentCategory.children" class="me-2" :key="category.id" :category="category" @select="select()"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
import {Category} from "~/lib/Category";
import {Categories} from "~/lib/Song";
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
        }
    }
});
</script>
