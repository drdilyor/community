<template>
  <div v-if="user" class="border rounded mx-2 mb-2 p-4 pb-2">
    <div class="md:flex">
      <img class="w-16 h-16 rounded-full mr-2 mb-2" :src="user.profile.picture" alt="">
      <div>
        <h1 class="text-xl font-medium break-all">
          {{ profile.name }}
          <span class="text-base text-gray-500">(@{{ profile.username }})</span>
          <user-badge :user="user" />
        </h1>
        <p class="mt-2">
          <span class="px-2 py-1 rounded bg-gray-100 mr-2 break-words">
            {{ profile.score }}
          </span>
          <span class="text-gray-600 brlak-all">
            {{ profile.title }}
          </span>
        </p>
      </div>
    </div>
    <div class="content mt-2" v-html="profile.bio" />
    <hr class="my-2">
    <p>{{ $t('joinedAt') }} {{ $f.date(user.createdAt) }}</p>
    <p>ID: <code>{{ user.id }}</code></p>
    <p v-if="profile.links" class="md:flex md:space-x-2">
      <template v-for="i in [
          {key: 'telegram', domain: 't.me'},
          {key: 'youtube'},
          {key: 'facebook'},
          {key: 'instagram'},
          {key: 'twitter'},
        ]" :key="i.key">

        <ui-button v-if="profile.links[i.key]" tag="a" type="flat" :href="`https://${i.domain || i.key + '.com'}/${profile.links[i.key]}`" target="_blank">
          {{ i.key }}
        </ui-button>

      </template>

      <ui-button v-if="profile.links.homepage" tag="a" type="flat" :href="profile.links.homepage" target="_blank">
        Web site
      </ui-button>
    </p>
  </div>
  <template v-if="articles">
    <div class="flex justify-between mx-2 mt-8 mb-2">
      <h2 class="text-2xl font-medium">{{ $t('articles') }}</h2>
      <ui-button type="flat" :class="{'bg-green-100': detailed}" @click="detailed = !detailed">{{ $t('detailed') }}</ui-button>
    </div>
    <div class="mx-2 mb-2">
      <ArticleInfo v-for="article in articles" :article="article" :detailed="detailed" />
      <ui-button v-if="!noMore" class="mx-auto" type="stroked" @click="loadArticles">{{ $t('loadMore') }}</ui-button>
      <div v-else class="text-center">
        {{ $t('noMoreArticles') }}
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ArticleInfo from './ArticleInfo.vue'
import UserBadge from './UserBadge.vue'

export default defineComponent({
  components: {ArticleInfo, UserBadge},
  data: () => ({
    detailed: false,
  }),
  computed: {
    user(): any | undefined {
      return this.$store.state.usersByUsername[this.username]
    },
    profile(): any | undefined {
      return this.user && this.user.profile
    },
    articles(): any[] | undefined {
      return this.user && this.$store.state.articlesByUser[this.user.id]
    },
    username(): string { 
      return ''+this.$route.params.username
    },
    noMore(): boolean {
      return !this.user
        ? false
        : this.$store.state.articlesByUserNoMore[this.user.id]
    }
  },
  created() {
    this.$store.dispatch('loadUser', this.username)
    .then(this.loadArticles)
  },
  methods: {
    loadArticles() {
      console.assert(typeof this.user == 'object')
      this.$store.dispatch('loadUserArticles', this.user.id)
    },
  },

  i18n: {
    messages: {
      en: {
        joinedAt: 'Joined at',
        articles: 'Articles',
        detailed: 'Detailed',
        noMoreArticles: 'No more articles',
      },
      uz: {
        joinedAt: "Hamjamiyatga qo'shilgan",
        articles: 'Maqolalar',
        detailed: "Batafsil",
        noMoreArticles: "Boshqa maqolalar yo'q",
      },
    }
  }
})
</script>
