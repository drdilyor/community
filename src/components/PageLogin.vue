<template>
  <form class="shadow p-4 mx-auto w-96 flex flex-col space-y-4" @submit.prevent="login">
    <h1 class="text-center text-xl">
      {{ $t('loginTitle') }}
    </h1>
    <ui-input v-model="email" type="email" :placeholder="$t('email')" required />
    <ui-input v-model="password" type="password" :placeholder="$t('password')" required />
    <ui-alert v-if="error" type="error">{{ error }}</ui-alert>
    <div class="flex flex-col items-stretch md:items-end">
      <ui-button native-type="submit">{{ $t('login') }}</ui-button>
    </div>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PageLogin',
  data: () => ({
    email: '',
    password: '',
    error: null as string | null,
  }),
  methods: {
    login() {
      this.error = null
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })
      .then(() => this.$router.push('/'))
      .catch((error: Error) => this.error = error.message)
    },
  },
  i18n: {
    messages: {
      en: {
        loginTitle: 'Log into One Million Uzbek Сoders',
      },
      uz: {
        loginTitle: 'One Million Uzbek Сoders ga kirish',
      },
    },
  },
})
</script>
