<template>
  <span
      v-if="user.profile.badge && user.profile.badge.text"
      class="ml-2 px-2 py-1 rounded text-sm"
      :class="badgeClass">
    {{ user.profile.badge.text }}
  </span>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    user: {type: Object, required: true},
  },
  computed: {
    badgeClass(): string {
      return ({
        bronze: 'bg-yellow-700 text-white',
        gold: 'bg-yellow-400 text-black',
      } as any)[this.user.profile.badge.type] || 'bg-gray-500 text-white'
    }
  },
})
</script>
