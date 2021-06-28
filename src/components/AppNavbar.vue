<template>
  <div class="flex justify-between items-center">
    <router-link to="/">
      <img class="w-16 h-16" src="../assets/logo.png" alt="Logo">
    </router-link>
    <div class="flex items-center pr-4 py-4 space-x-4">
      <ui-input class="hidden md:block" placeholder="Search..." dense />
      <ui-button class="md:hidden" type="flat">
        <i class="material-icons">search</i>
      </ui-button>
      <ui-button v-if="!$store.state.auth.token">
        {{ $t('login') }}
      </ui-button>
      <img v-else class="rounded-full w-8 h-8"
           :src="$store.state.auth.user.profile.picture" alt="Profile">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "app-navbar",
  i18n: {
    messages: {
      en: {login: 'Log in'},
      uz: {login: 'Kirish'},
    },
  },
})
</script>

