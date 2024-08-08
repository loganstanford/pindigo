<template>
  <div class="w-full max-w-md relative">
    <input
      v-model="query"
      @input="onInput"
      type="text"
      placeholder="Search for locations, events, or players..."
      class="w-full p-2 border dark:border-gray-700 text-gray-600 rounded-lg mb-4"
    />
    <button @click="search" class="w-full p-2 bg-blue-500 text-white rounded-lg">
      Search
    </button>
    <div v-if="results && showDropdown" class="absolute bg-white dark:bg-gray-800 w-full mt-1 border rounded-lg shadow-lg z-10">
      <div v-if="results.locations.length" class="p-4">
        <h3 class="text-xl font-semibold mb-2">Locations</h3>
        <ul>
          <li
            v-for="location in results.locations.slice(0, 3)"
            :key="location.id"
            @click="selectLocation(location)"
            class="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            <h4 class="text-lg font-semibold">{{ location.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ location.pbmRegionName }}</p>
          </li>
        </ul>
        <button @click="viewMore('locations')" class="text-blue-500 hover:underline">View more locations</button>
      </div>
      <div v-if="results.events.length" class="p-4">
        <h3 class="text-xl font-semibold mb-2">Events</h3>
        <ul>
          <li
            v-for="event in results.events.slice(0, 3)"
            :key="event.id"
            @click="selectEvent(event)"
            class="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            <h4 class="text-lg font-semibold">{{ event.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ event.date }}</p>
          </li>
        </ul>
        <button @click="viewMore('events')" class="text-blue-500 hover:underline">View more events</button>
      </div>
      <div v-if="results.players.length" class="p-4">
        <h3 class="text-xl font-semibold mb-2">Players</h3>
        <ul>
          <li
            v-for="player in results.players.slice(0, 3)"
            :key="player.id"
            @click="selectPlayer(player)"
            class="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            <h4 class="text-lg font-semibold">{{ player.username }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ player.initials }}</p>
          </li>
        </ul>
        <button @click="viewMore('players')" class="text-blue-500 hover:underline">View more players</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axiosInstance from '../axiosInstance';
import { useDebounceFn } from '@vueuse/core';
import { useRouter } from 'vue-router';

export default {
  name: 'SearchComponent',
  setup() {
    const query = ref('');
    const results = ref({
      locations: [],
      events: [],
      players: []
    });
    const showDropdown = ref(false);
    const router = useRouter();

    const fetchResults = useDebounceFn(async () => {
      if (query.value.trim() === '') {
        results.value = {
          locations: [],
          events: [],
          players: []
        };
        showDropdown.value = false;
        return;
      }

      try {
        const [locations, events, players] = await Promise.all([
          axiosInstance.post('/locations/search', { query: query.value }),
          axiosInstance.post('/events/search', { query: query.value }),
          axiosInstance.post('/users/search', { query: query.value })
        ]);

        results.value = {
          locations: locations.data,
          events: events.data,
          players: players.data
        };

        showDropdown.value = true;
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    const onInput = () => {
      fetchResults();
    };

    const selectLocation = (location) => {
      router.push({ name: 'LocationDetails', params: { id: location.id } });
      showDropdown.value = false;
    };

    const selectEvent = (event) => {
      router.push({ name: 'EventDetails', params: { id: event.id } });
      showDropdown.value = false;
    };

    const selectPlayer = (player) => {
      router.push({ name: 'UserDetails', params: { id: player.id } });
      showDropdown.value = false;
    };

    const viewMore = (category) => {
      console.log(`View more ${category}`);
    };

    return {
      query,
      results,
      showDropdown,
      onInput,
      selectLocation,
      selectEvent,
      selectPlayer,
      viewMore
    };
  }
};
</script>

<style scoped>
.dark .border {
  border-color: #4b5563;
}
</style>
