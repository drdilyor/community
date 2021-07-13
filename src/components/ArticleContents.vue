<template>
  <div v-if="contents.length" class="border-l-4 border-green-600 px-4 py-2">
    <div class="font-bold">
      {{ $t('contents') }}
    </div>
    <div v-for="item in contents">
      {{ item.text }}
    </div>
    <a v-if="needsExpand && !expanded" class="hover:text-green-600" href="#!" @click.prevent="expanded = true">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
      </svg>
    </a>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    article: {type: Object, required: true},
  },
  data: () => ({
    expanded: false,
  }),
  computed: {
    allContents() {
      const matches = []
      const re = /<h(.)[^>]*>(.*?)<\/h.>/g
      let m;
      while (m = re.exec(this.article.content)) {
        matches.push(m)
      }
      const contents = matches.map(match => ({
        level: match[1] - 2,
        text: match[2].replace(/<.*?>/g, '')
      }))
      // TODO: normalize f*** usage of headings

      return contents
    },
    contents() {
      if (this.expanded) return this.allContents
      if (!this.needsExpand) return this.allContents
      return this.allContents.slice(0, 3)
    },
    needsExpand() {
      return this.allContents.length > 4
    },
  },
  i18n: {
    messages: {
      en: {contents: 'Table of contents'},
      uz: {contents: 'Mundarija'},
    }
  }
})
</script>
