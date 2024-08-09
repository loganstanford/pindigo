<template>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Left Column: Ranks 1-5 -->
        <div>
          <div v-for="(score, index) in leaderboard.slice(0, 5)" :key="score.id" class="relative border p-4 rounded-lg dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <!-- Wrapper for avatar and crown -->
                <div class="relative flex items-center justify-center">
                  <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                    <img v-if="score.user.profile.avatar" :src="score.user.profile.avatar" alt="Avatar" class="w-full h-full object-cover">
                    <i v-else class="fas fa-user text-gray-500 dark:text-gray-400"></i>
                  </div>
                  <!-- Crown positioned relative to the avatar -->
                  <img v-if="index === 0" src="/yellow_crown.png" alt="Crown" class="absolute -top-4 left-0 transform translate-x-1/4 w-10 h-10 crown-icon" />
                </div>
                <div>
                  <div class="text-lg font-semibold">
                    {{ index + 1 }}. {{ score.user.username }}
                    <span class="text-sm text-gray-600 dark:text-gray-400">({{ score.user.profile.initials }})</span>
                  </div>
                  <div class="text-sm italic text-gray-500 dark:text-gray-400">
                    {{ formatDate(score.score.recordedAt) }}
                  </div>
                </div>
              </div>
              <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ formatScore(score.score.score) }} points
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right Column: Ranks 6-10 -->
        <div>
          <div v-for="(score, index) in leaderboard.slice(5, 10)" :key="score.id" class="relative border p-4 rounded-lg dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                  <img v-if="score.user.profile.avatar" :src="score.user.profile.avatar" alt="Avatar" class="w-full h-full object-cover">
                  <i v-else class="fas fa-user text-gray-500 dark:text-gray-400"></i>
                </div>
                <div>
                  <div class="text-lg font-semibold">
                    {{ index + 6 }}. {{ score.user.username }}
                    <span class="text-sm text-gray-600 dark:text-gray-400">({{ score.user.profile.initials }})</span>
                  </div>
                  <div class="text-sm italic text-gray-500 dark:text-gray-400">
                    {{ formatDate(score.score.recordedAt) }}
                  </div>
                </div>
              </div>
              <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ formatScore(score.score.score) }} points
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameLeaderboard',
    props: {
      leaderboard: Array
    },
    methods: {
      formatScore(score) {
        return score.toLocaleString('en-US');
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Crown icon styling */
  .crown-icon {
    top: -20px; /* Adjust the crown's position to sit on top of the avatar */
    left: 50%; /* Centers the crown horizontally over the avatar */
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    z-index: 10; /* Ensure the crown is above other elements */
  }
  </style>
  