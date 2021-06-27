<template>
  <component :is="tag" class="px-4 py-2 rounded flex" :class="buttonClass()">
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
      validator: (val: string) => ['primary', 'outline', 'flat'].includes(val)
    }
  },
  methods: {
    // not using computed as it doesn't work with HMR
    buttonClass(): string | undefined {
      return {
        primary: 'bg-green-600 text-white hover:bg-green-700',
        outline: 'border border-green-600 text-green-600 hover:bg-green-50',
        flat: 'hover:text-green-600',
      }[this.type]
    }
  }
})
</script>
