<template>
  <div>
    <api-view url="/users" v-slot="{object: users}">
      Good
      <div v-for="user in users" :key="user._id">
        {{user._id}}
        {{ user.profile.name }}
      </div>
    </api-view>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
})
</script>
