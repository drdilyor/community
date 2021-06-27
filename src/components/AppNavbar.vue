<template>
  <div class="flex justify-between">
    <div>
      <img src="../assets/logo.png" alt="Logo">
    </div>
    <div class="flex items-center">
      <ui-button>Log in</ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "app-navbar",
})
</script>
