<template>
  <input class="px-4 border-2 border-gray-400 rounded outline-none focus:border-green-500" :class="inputClass">
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'ui-input',
  props: {
    dense: {type: Boolean, default: false},
  },
  computed: {
    inputClass(): string {
      return ['py-3', 'py-1'][+this.dense]
    }
  }
})
</script>
