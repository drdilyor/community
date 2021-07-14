<template>
  <input :value="modelValue" @input="onInput"
      class="px-4 border-2 border-gray-400 rounded outline-none focus:border-green-500" :class="inputClass">
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'ui-input',
  props: {
    dense: {type: Boolean, default: false},
    modelValue: {type: [String, Number], required: false},
  },
  computed: {
    inputClass(): string {
      return ['py-3', 'py-1'][+this.dense]
    }
  },
  methods: {
    onInput(event: Event) {
      if (event.target !== null)
        this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
    }
  }
})
</script>
