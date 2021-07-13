<template>
  <div class="px-4">
    <article-info v-if="article" :article="article">
      <div class="content mt-4" v-html="article.content" />
    </article-info>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ArticleInfo from './ArticleInfo.vue'

export default defineComponent({
  name: 'PageArticle',
  components: {ArticleInfo},
  computed: {
    article() {
      return this.$store.state.articlesById[this.$route.params.id]
    },
  },
  created() {
    this.$store.dispatch('loadArticle', this.$route.params.id)
  },
})
</script>
