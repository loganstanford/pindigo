import { createRouter, createWebHistory } from "vue-router";
import PindigoHome from "../views/PindigoHome.vue";
import LocationDetails from "../views/LocationDetails.vue";
import EventDetails from "../views/EventDetails.vue";
import UserDetails from "../views/UserDetails.vue";
import LocationGameDetails from "../views/LocationGameDetails.vue";

const routes = [
  {
    path: "/",
    name: "PindigoHome",
    component: PindigoHome,
  },
  {
    path: "/location/:id",
    name: "LocationDetails",
    component: LocationDetails,
    props: true,
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    component: EventDetails,
    props: true,
  },
  {
    path: "/user/:id",
    name: "UserDetails",
    component: UserDetails,
    props: true,
  },
  {
    path: "/location/:locationId/game/:gameId",
    name: "LocationGameDetails",
    component: LocationGameDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
