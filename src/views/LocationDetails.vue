<template>
    <div>
      <h1 class="text-2xl font-semibold mb-4">{{ location.name }}</h1>
  
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
        this.$router.push({ name: 'LocationGameDetails', params: { locationId: this.$route.params.id, gameId } });
      }
    }
  };
  </script>
  
  <style scoped>
  .dark .border {
    border-color: #4b5563;
  }
  </style>
  