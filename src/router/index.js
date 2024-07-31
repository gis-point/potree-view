import { createRouter, createWebHistory } from 'vue-router';

import { ROUTE_404 } from '../routes/404.route.js';
import { INDEX_ROUTE } from '../routes/index.route.js'
import { DETAILS_ROUTE } from '../routes/details.route.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    INDEX_ROUTE,
    ROUTE_404,
    DETAILS_ROUTE,
  ],
});

export default router;
