<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="game in games" :key="game.id" class="border p-4 rounded-lg cursor-pointer" @click="selectGame(game.id)">
        <img :src="game.bg_url" :alt="game.name" class="w-full h-48 object-cover mb-4 rounded-lg" />
        <h2 class="text-lg font-semibold mb-2">{{ game.name }}</h2>
        
        <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 00-.707.293l-3.66 3.66a.25.25 0 01-.354 0l-1.29-1.29a1 1 0 10-1.414 1.414l1.29 1.29a.25.25 0 010 .354l-3.66 3.66A1 1 0 103 14.414l3.66-3.66a.25.25 0 01.354 0l1.29 1.29a1 1 0 101.414-1.414l-1.29-1.29a.25.25 0 010-.354l3.66-3.66A1 1 0 0010 3z" />
            <path d="M9.293 15.707a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414l-5 5a1 1 0 000 1.414z" />
          </svg>
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
  