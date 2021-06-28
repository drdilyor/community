<template>
  <div class="border rounded px-4 py-2" :class="alertClass">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'ui-alert',
  props: {
    type: {type: String, default: 'default'},
  },
  computed: {
    alertClass(): string | undefined {
      return {
        default: 'border-gray-600 bg-gray-50 text-gray-700',
        error: 'border-red-600 bg-red-50 text-red-700',
        success: 'border-green-600 bg-green-50 text-green-700',
      }[this.type]
    }
  }
})
</script>
