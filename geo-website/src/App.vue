<script setup lang="ts">
import { ref } from 'vue'
import SiteHeader from './layouts/SiteHeader.vue'
import SiteFooter from './layouts/SiteFooter.vue'
import ContactForm from './components/ContactForm.vue'

const showForm = ref(false)
</script>

<template>
  <div class="app">
    <SiteHeader @open-form="showForm = true" />
    <main>
      <router-view @open-form="showForm = true" />
    </main>
    <SiteFooter />
    <ContactForm v-if="showForm" @close="showForm = false" />
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  background: #03040a;
}

main {
  padding-top: 72px;
}
</style>
