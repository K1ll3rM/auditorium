<template>
  <div>
    <div class="buttons" v-if="!$music.currentCategory">
      <CategoryButton v-for="(category, id) in categories" :key="id" class="me-2" :category="category"
                      @select="select()"/>
    </div>

    <div class="breadcrumb">
      <div class="breadcrumb-item" v-for="category in breadcrumb">
        <CategoryButton button-class="btn-sm" :key="category.id" :category="category" @select="select()"/>
      </div>
      <div class="breadcrumb-item" v-if="breadcrumb.length && $music.currentCategory">
        {{ $music.currentCategory.manifest.name }}
      </div>
    </div>

    <div v-if="this.$music.currentCategory">
      <h2 v-if="this.$music.currentCategory.manifest.fullName">{{ this.$music.currentCategory.manifest.fullName }}</h2>
      <p v-if="this.$music.currentCategory.manifest.description">{{
          this.$music.currentCategory.manifest.description
        }}</p>
    </div>

    <div v-if="$music.currentCategory && $music.currentCategory.children">
      <CategoryButton v-if="$music.currentCategory.parent" class="me-2" :key="$music.currentCategory.parent.id"
                      :category="$music.currentCategory.parent" content=".." @select="select()"/>
      <CategoryButton v-for="(category) in $music.currentCategory.children" class="me-2" :key="category.id"
                      :category="category" @select="select()"/>
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
import {defineNuxtComponent} from "#app";
import {Categories, Category} from "~~/lib/Category";
import CategoryButton from "~~/components/Categories/CategoryButton.vue";

export default defineNuxtComponent({
  components: {CategoryButton},
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
      if (this.$music.currentCategory) {
        this.breadcrumb = this.$music.currentCategory.getBreadcrumb();
      } else {
        this.breadcrumb = [];
      }

      this.$root.$emit('category.change');
    }
  }
});
</script>
