<template>
  <div>
    <div v-for="article in $store.state.articles" :key="article._id"
         class="flex border rounded mb-2 hover:bg-gray-100">
      <div class="p-4">
        <h3 class="text-xl font-medium mb-2 cursor-pointer" @click="$router.push(`/post/${article.id}`)">
          {{ article.title }}
        </h3>
        <div class="flex">
          <img class="w-12 h-12 rounded-full mr-2" :src="article.user.profile.picture" alt="Profile">
          <div>
            <p class="font-medium">{{ article.user.profile.name }}</p>
            <p class="text-gray-500">{{ $t('posted') }} {{ articleDate(article.createdAt) }}</p>
          </div>
        </div>
        <div class="content mt-4" v-html="article.summary" />
      </div>
      <img v-if="article.images.length" :src="`${article.images[0].src}`" alt=""
           class="w-1/4 object-cover flex-shrink-0">
    </div>
    <ui-button class="mx-auto mb-4" type="stroked" @click="loadMore">{{ $t('loadMore') }}</ui-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PageHome",
  methods: {
    loadMore() {
      this.$store.dispatch('loadArticles')
    },
    articleDate(date: Date | string) {
      date = new Date(date)
      if (date.setHours(0,0,0,0) == new Date().setHours(0,0,0,0)) {
        return this.$t('today')
      } else {
        return date.toLocaleDateString()
      }
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
