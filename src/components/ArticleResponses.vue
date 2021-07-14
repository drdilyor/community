<template>
  <div v-if="responses && responses.length" class="border rounded p-2 space-y-4">
    <div v-for="response in responses" class="flex">
      <img class="w-12 h-12 rounded-full mr-2" :src="response.user.profile.picture" alt="">
      <div>
        <div class="flex">
          <div class="font-bold">{{ response.user.profile.name }}</div>
          <div class="text-gray-600 ml-2">{{ $f.date(response.createdAt) }}</div>
        </div>
        <div v-html="response.content" />
        <like-button :value="response.counts.upvotes" :liked="response.upvoted" @click="$store.dispatch('likeResponse', response)" />
      </div>
    </div>
  </div>
  <div v-else class="border rounded text-center py-8">
    {{ $t('noResponses') }}
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import LikeButton from './LikeButton.vue'

export default defineComponent({
  components: {LikeButton},
  props: {
    article: {type: Object, required: true},
  },
  computed: {
    responses() {
      const result = this.$store.state.responsesByArticleId[this.article.id]
      console.log({result})
      return result
    }
  },
  created() {
    this.$store.dispatch('loadResponses', this.article.id)
  },
  i18n: {
    messages: {
      en: {noResponses: 'No responses yet'},
      uz: {noResponses: "Hozircha javob yo'q"}
    }
  }
})
</script>
