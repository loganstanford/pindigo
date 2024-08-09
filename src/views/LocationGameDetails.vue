<template>
  <div class="p-4">
    <!-- Header Row: Back Button, Title, Filter Buttons -->
    <div class="relative flex items-center mb-6">
      <!-- Back Button -->
      <div class="flex-shrink-0">
        <button @click="goBack" class="bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">
          &larr; Back
        </button>
      </div>

      <!-- Game and Location Title -->
      <h1 class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-center">
        {{ game.name }} - {{ location.name }}
      </h1>

      <!-- Filter Buttons -->
      <div class="flex-grow flex justify-end space-x-2">
        <button @click="filterLeaderboard('all-time')" class="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded">All Time</button>
        <button @click="filterLeaderboard('this-month')" class="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded">This Month</button>
        <button @click="filterLeaderboard('this-week')" class="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded">This Week</button>
        <button @click="filterLeaderboard('today')" class="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded">Today</button>
      </div>
      </div>

    <!-- Game Background Image -->
    <img 
      :src="game.bg_url" 
      alt="Game Background" 
      class="w-full h-60 object-cover rounded-lg mb-6" 
    />

    <!-- Leaderboard Title -->
    <h2 class="text-xl font-semibold mb-4 text-center">Leaderboard</h2>

    <!-- Leaderboard Component -->
    <GameLeaderboard :leaderboard="filteredLeaderboard" />
  </div>
</template>

<script>
import axiosInstance from '../axiosInstance';
import GameLeaderboard from '../components/GameLeaderboard.vue';

export default {
  name: 'LocationGameDetails',
  components: {
    GameLeaderboard,
  },
  props: ['locationId', 'gameId'],
  data() {
    return {
      game: {},
      location: {},
      leaderboard: [],
      filteredLeaderboard: [],
    };
  },
  watch: {
    '$route.params.gameId': {
      immediate: true,
      handler(newGameId) {
        this.fetchGameDetails(newGameId);
        this.fetchLeaderboard(newGameId);
      },
    },
    '$route.params.locationId': {
      immediate: true,
      handler(newLocationId) {
        this.fetchLocationDetails(newLocationId);
      },
    },
  },
  methods: {
    async fetchGameDetails(id) {
      try {
        const response = await axiosInstance.get(`/machines/${id}`);
        this.game = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLocationDetails(id) {
      try {
        const response = await axiosInstance.get(`/locations/${id}`);
        this.location = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLeaderboard(gameId) {
      try {
        const response = await axiosInstance.get(
          `/leaderboards/location/${this.locationId}/machine/${gameId}`
        );
        this.leaderboard = response.data.leaderboard;
        this.filteredLeaderboard = this.leaderboard; // Initialize with all-time data
      } catch (error) {
        console.error(error);
      }
    },
    filterLeaderboard(timeframe) {
      const now = new Date();
      if (timeframe === 'all-time') {
        this.filteredLeaderboard = this.leaderboard;
      } else if (timeframe === 'this-month') {
        this.filteredLeaderboard = this.leaderboard.filter((score) => {
          const recordedAt = new Date(score.score.recordedAt);
          return recordedAt.getMonth() === now.getMonth() && recordedAt.getFullYear() === now.getFullYear();
        });
      } else if (timeframe === 'this-week') {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        this.filteredLeaderboard = this.leaderboard.filter((score) => {
          const recordedAt = new Date(score.score.recordedAt);
          return recordedAt >= startOfWeek;
        });
      } else if (timeframe === 'today') {
        this.filteredLeaderboard = this.leaderboard.filter((score) => {
          const recordedAt = new Date(score.score.recordedAt);
          return recordedAt.toDateString() === now.toDateString();
        });
      }
    },
    goBack() {
      this.$router.push({ name: 'LocationDetails', params: { id: this.locationId } });
    },
  },
  created() {
    this.fetchLocationDetails(this.locationId);
    this.fetchGameDetails(this.gameId);
    this.fetchLeaderboard(this.gameId);
    this.filteredLeaderboard = this.leaderboard; // Initialize with all-time data
  },
};
</script>

<style scoped>

</style>
