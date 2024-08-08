<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <img src="/pindigo-logo-horizontal-white-new.svg" alt="Pindigo Logo" class="w-1/2 mb-8" />
    <SearchComponent />
  </div>
</template>

<script>
import SearchComponent from '../components/SearchComponent.vue';

export default {
  name: 'PindigoHome',
  components: {
    SearchComponent
  }
};
</script>
