<template>
  <component :is="tag" class="rounded flex items-center justify-center uppercase text-sm font-medium"
             :class="buttonClass" type="tag == 'button' && nativeType">
    <slot />
  </component>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'ui-button',
  props: {
    tag: {type: String, default: 'button'},
    type: {
      type: String,
      default: 'primary',
      validator: (val: string) => ['primary', 'stroked', 'flat', 'icon'].includes(val)
    },
    nativeType: {type: String, default: 'button'},
  },
  computed: {
    buttonClass(): string | undefined {
      return {
        primary: 'py-2 px-4 bg-green-600 text-white hover:bg-green-500',
        stroked: 'py-1.75 px-4 border border-gray-300 text-green-600 hover:bg-green-50',
        flat: 'py-2 px-2 text-green-600 hover:bg-green-50',
        icon: 'py-1.5 px-2 text-gray-600 hover:text-green-500 leading-1',
      }[this.type]
    }
  }
})
</script>

<style>
.py-1\.75 {
  padding-top: 0.4375rem;
  padding-bottom: 0.4375rem;
}
</style>
