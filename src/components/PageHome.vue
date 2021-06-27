<template>
  <p>Home</p>
  <ui-input />
  <p class="p-8 space-x-4 flex items-center">
    <ui-button type="primary">Hello</ui-button>
    <ui-button type="stroked">Hello</ui-button>
    <ui-button type="flat">Hello</ui-button>
    <ui-button type="icon"><i class="material-icons">home</i></ui-button>
  </p>
</template>

<script lang="ts">
export default {
  name: "PageHome",
}
</script>
