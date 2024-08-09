<template>
  <div class="event-details">
    <h1 class="text-2xl font-semibold mb-4 text-center">{{ event.name }}</h1>
    
    <!-- Leaderboard Grid -->
    <div class="leaderboard-container">
      <div class="leaderboard-grid">
        <div
          v-for="(leaderboardSet, index) in paginatedLeaderboards"
          :key="index"
          class="leaderboard-set"
          :class="{ 'active': index === currentSet }"
        >
          <GameLeaderboard
            v-for="leaderboard in leaderboardSet"
            :key="leaderboard.machine.id"
            :leaderboard="leaderboard.leaderboard"
            :machine="leaderboard.machine"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../axiosInstance';
import GameLeaderboard from '../components/GameLeaderboard.vue';

export default {
  name: 'EventDetails',
  components: {
    GameLeaderboard,
  },
  props: ['id'],
  data() {
    return {
      event: {}, // Event details
      leaderboards: [], // Full leaderboard data
      currentSet: 0, // Index for paginated leaderboard sets
    };
  },
  computed: {
    paginatedLeaderboards() {
      const sets = [];
      for (let i = 0; i < this.leaderboards.length; i += 4) {
        sets.push(this.leaderboards.slice(i, i + 4));
      }
      return sets;
    },
  },
  methods: {
    async fetchEventDetails(id) {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        this.event = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLeaderboards(id) {
      try {
        const response = await axiosInstance.get(`/leaderboards/event/${id}`);
        this.leaderboards = response.data.leaderboard;
        console.log(this.leaderboards);
      } catch (error) {
        console.error(error);
      }
    },
    cycleLeaderboards() {
      this.currentSet = (this.currentSet + 1) % this.paginatedLeaderboards.length;
    },
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.fetchEventDetails(newId);
        this.fetchLeaderboards(newId);
      },
    },
  },
  mounted() {
    this.fetchEventDetails(this.id);
    this.fetchLeaderboards(this.id);
    setInterval(this.cycleLeaderboards, 10000); // Cycle every 10 seconds
  },
};
</script>

<style scoped>
/* Container for the event details */
.event-details {
  padding: 20px;
}

/* Leaderboard grid container */
.leaderboard-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Leaderboard grid layout */
.leaderboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  width: 90%;
  height: 90%;
}

/* Individual leaderboard set */
.leaderboard-set {
  display: none;
}

.leaderboard-set.active {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  animation: fadeIn 1s ease-in-out;
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
