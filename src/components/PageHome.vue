<template>
  <div class="p-2">
    <article-info v-for="article in $store.state.feed" :key="article._id" :article="article" />
    <ui-button class="mx-auto mb-4" type="stroked" @click="loadMore">{{ $t('loadMore') }}</ui-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ArticleInfo from './ArticleInfo.vue'

export default defineComponent({
  name: 'PageHome',
  components: {ArticleInfo},
  methods: {
    loadMore() {
      this.$store.dispatch('loadFeed')
    },
  },
  created() {
    this.loadMore()
  },
  i18n: {
    messages: {
      en: {
        more: 'More',
        loadMore: 'Load more',
      },
      uz: {
        more: "Ko'proq",
        loadMore: "Ko'proq yuklash",
      },
    }
  }
})
</script>
