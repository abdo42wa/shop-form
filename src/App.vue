<template>
<div class="min-h-screen flex flex-col">
    <MainHeader />
    <div class="flex-1">
      <RouterView />
    </div>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
</script>
