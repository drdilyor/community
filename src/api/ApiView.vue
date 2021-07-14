<template>
  <slot v-if="error" name="networkError" :error="error">
    A network error occured
  </slot>
  <slot v-else-if="res && res.status != 200" name="error" :res="res">
    An error occured
  </slot>
  <slot v-else-if="loading" name="loading">
    Loading...
  </slot>
  <slot v-else :object="data">
    Data fetched
  </slot>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import api from '../api'

export default defineComponent({
  props: {
    url: {type: String, required: true},
  },
  data: () => ({
    loading: true,
    error: null as any,
    data: null as any,
    res: null as Response | null,
  }),
  created() {
    api.request('get', this.url)
    .then(([data, res]) => {
      this.data = data
      this.res = res
      this.loading = false
    })
    .catch(err => this.error = err)
  }
})
</script>
