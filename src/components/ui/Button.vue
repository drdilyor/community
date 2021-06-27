<template>
  <component :is="tag" class="px-4 py-2 rounded border" :class="buttonClass">
    <slot />
  </component>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: 'ui-button',
  props: {
    tag: {type: String, default: 'button'},
    type: {
      type: String,
      default: 'primary',
      validator: (val: string) => ['primary', 'outline'].includes(val)
    }
  },
  computed: {
    buttonClass(): string | undefined {
      return {
        primary: 'bg-green-600 text-white border-green-600',
        outline: 'border-green-600 text-green-600'
      }[this.type]
    }
  }
})
</script>
