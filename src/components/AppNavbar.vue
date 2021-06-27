<template>
  <div class="flex justify-between">
    <div>
      <img class="w-16 h-16" src="../assets/logo.png" alt="Logo">
    </div>
    <div class="flex items-center pr-4">
      <ui-button type="flat">
        <i class="material-icons">search</i>
      </ui-button>
      <ui-button>{{ $t('login') }}</ui-button>
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

