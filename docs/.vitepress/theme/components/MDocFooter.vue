<script setup lang="ts">
import { inject, Ref, computed } from 'vue'
import { useRoute } from 'vitepress'

const DEV = inject('DEV') as Ref<boolean>
const route = useRoute()

const pageId = computed(() => route.path.replace('/mm-notes', ''))
</script>

<template>
  <div class="copyright">
    <img v-if="!DEV" class="visitor"
      :src="`https://visitor-badge.laobi.icu/badge?page_id=Pupper0601/vite-docs.${pageId}`" title="当前页面累计访问数"
      onerror="this.style.display='none'" />
    Copyright © 2019-present maomao
  </div>
</template>

<style scoped>
.copyright {
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
  display: none;
}

.visitor {
  margin-right: 8px;
}

@media (max-width: 414px) {
  .visitor {
    display: none;
  }
}
</style>
