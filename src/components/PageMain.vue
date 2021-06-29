<template>
  <div class="md:flex">
    <div class="md:w-1/5 px-4">
      <ui-button v-if="!$store.state.homeShowTopics" class="w-full md:hidden" type="flat"
                 @click="$store.commit('setHomeShowTopics', true)">
        {{ $t('topics') }}
      </ui-button>
      <div class="md:block" :class="{hidden: !$store.state.homeShowTopics}">
        <div class="flex md:block flex-wrap">
          <router-link
              v-for="topic in $store.state.topics"
              :key="topic._id"
              :to="`/topic/${topic.slug}`"
              exact-active-class="bg-green-100"
              class="py-2 px-4 flex hover:bg-green-50 w-1/2 md:w-full flex-grow">
            <img class="w-6 h-6 mr-2" :src="topic.picture" alt="">
            <span class="truncate">{{ topic.name }}</span>
          </router-link>
        </div>
        <ui-button class="w-full md:hidden" type="flat" @click="$store.commit('setHomeShowTopics', false)">{{ $t('close') }}</ui-button>
      </div>
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
  data: () => ({
  }),
  created() {
    this.$store.dispatch('loadTopics')
  },
  i18n: {
    messages: {
      en: {topics: 'Show topics'},
      uz: {topics: "Mavzularni ko'rish"},
    }
  },
})
</script>
