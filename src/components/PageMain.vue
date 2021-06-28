<template>
  <div class="md:flex">
    <div class="md:w-1/5 px-4">
      <router-link
          v-for="topic in $store.state.topics"
          :key="topic._id"
          :to="`/topic/${topic.slug}`"
          exact-active-class="bg-green-100"
          class="py-2 px-4 flex hover:bg-green-50">
        <span class="w-6 h-6 mr-2">
          <img :src="topic.picture" alt="">
        </span>
        <span class="truncate">{{ topic.name }}</span>
      </router-link>
    </div>
    <div class="md:w-4/5 px-4">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PageMain',
  created() {
    this.$store.dispatch('loadTopics')
  },
})
</script>
