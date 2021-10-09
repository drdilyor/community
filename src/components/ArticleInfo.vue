<template>
  <div class="border rounded mb-2">
    <div class="p-4 pb-2">
      <h3 class="text-xl font-medium mb-2 cursor-pointer" @click="$router.push(`/article/${article.id}`)">
        {{ article.title }}
      </h3>
      <div class="flex mb-2">
        <img class="w-12 h-12 rounded-full mr-2 cursor-pointer" :src="article.user.profile.picture" alt="Profile" samesite="strict"
            @click="$router.push(`/user/${article.user.profile.username}`)">
        <div>
          <router-link class="font-medium cursor-pointer" :to="`/user/${article.user.profile.username}`">
            {{ article.user.profile.name }}
          </router-link>
          <p class="text-gray-500">{{ $t('posted') }} {{ $f.date(article.createdAt) }}</p>
        </div>
      </div>
      <article-contents v-if="detailed" :article="article" />
      <div class="content mt-4" v-html="detailed ? article.content : article.summary">
      </div>
      <div class="mt-2">
        <like-button :value="article.counts.upvotes" :liked="article.upvoted" @click="like" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ArticleContents from './ArticleContents.vue'
import LikeButton from './LikeButton.vue'

export default defineComponent({
  name: 'ArticleInfo',
  components: {ArticleContents, LikeButton},
  props: {
    article: {type: Object, required: true},
    detailed: {type: Boolean, default: false},
  },
  methods: {
    like() {
      this.$store.dispatch('likeArticle', this.article)
    }
  },
  i18n: {
    messages: {
      en: {posted: 'Posted'},
      uz: {posted: 'Joylashtirilgan'},
    }
  },
})
</script>
