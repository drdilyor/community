<template>
  <div>
    <article-info v-for="article in $store.state.homeArticles" :key="article._id"
               :article="article" show-img>
      <div class="content mt-4" v-html="article.summary" />
    </article-info>
    <ui-button class="mx-auto mb-4" type="stroked" @click="loadMore">{{ $t('loadMore') }}</ui-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ArticleInfo from './ArticleInfo.vue'

export default defineComponent({
  name: "PageHome",
  components: {ArticleInfo},
  methods: {
    loadMore() {
      this.$store.dispatch('loadHomeArticles')
    },
  },
  created() {
    this.loadMore()
  },
  i18n: {
    messages: {
      en: {
        posted: 'Posted',
        today: 'today',
        more: 'More',
        loadMore: 'Load more',
      },
      uz: {
        posted: 'Joylashitirilgan',
        today: 'bugun',
        more: "Ko'proq",
        loadMore: "Ko'proq yuklash",
      },
    }
  }
})
</script>
