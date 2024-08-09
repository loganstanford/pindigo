<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div 
      v-for="game in games" 
      :key="game.id" 
      class="border p-4 rounded-lg cursor-pointer" 
      @click="selectGame(game.id)"
    >
      <img :src="game.bg_url" :alt="game.name" class="w-full h-48 object-contain mb-4 rounded-lg" />
      <h2 class="text-lg font-semibold mb-2">{{ game.name }}</h2>
      
      <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <i class="fas fa-crown text-yellow-500 mr-2"></i>
        {{ game.topPlayer.username }} - {{ game.topPlayer.score.toLocaleString() }} points
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameGrid',
  props: {
    games: Array
  },
  methods: {
    selectGame(gameId) {
      this.$emit('gameSelected', gameId);
    }
  }
};
</script>

<style scoped>
.dark .border {
  border-color: #4b5563;
}
</style>
