<template>
  <div class="p-4">
    <!-- Header Row: Back Button, Title, Filter Buttons -->
    <div class="relative flex items-center mb-6">
      <!-- Back Button -->
      <div class="flex-shrink-0">
        <button @click="goBackHome" class="bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">
          &larr; Back
        </button>
      </div>

      <h1 class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-center">{{ location.name }}</h1>
    </div>

    <!-- GameGrid populated with games and leaderboard details -->
    <GameGrid :games="gamesWithLeaderboard" @gameSelected="selectGame" />
  </div>
</template>

<script>
import axiosInstance from '../axiosInstance';
import GameGrid from '../components/GameGrid.vue';

export default {
  name: 'LocationDetails',
  components: {
    GameGrid
  },
  props: ['id'],
  data() {
    return {
      location: {},
      leaderboards: [],
      gamesWithLeaderboard: []
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.fetchLocationDetails(newId);
        this.fetchLocationLeaderboards(newId);
      }
    }
  },
  methods: {
    async fetchLocationDetails(id) {
      try {
        const response = await axiosInstance.get(`/locations/${id}`);
        this.location = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLocationLeaderboards(id) {
      try {
        const response = await axiosInstance.get(`/leaderboards/location/${id}`);
        this.leaderboards = response.data.leaderboard;

        // Combine games with leaderboard data
        this.gamesWithLeaderboard = this.leaderboards.map(entry => {
          return {
            ...entry.machine,
            topPlayer: {
              username: entry.user.username,
              score: entry.score.score
            }
          };
        });
      } catch (error) {
        console.error(error);
      }
    },
    selectGame(gameId) {
      this.$router.push({ 
        name: 'LocationGameDetails', 
        params: { 
          locationId: this.$route.params.id, 
          gameId 
        } 
      });
    },
    goBackHome() {
      this.$router.push({ name: 'PindigoHome' }); // Assumes 'HomePage' is the name of your home page route
    }
  }
};
</script>
