<template>
  <app-navbar />
  <div class="constrainted">
    <router-view v-slot="{Component, route}">
      <component :is="Component" :key="route.path" />
    </router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import AppNavbar from './components/AppNavbar.vue'

export default defineComponent({
  name: 'App',
  components: {AppNavbar}
})
</script>

<style>
.constrainted {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
