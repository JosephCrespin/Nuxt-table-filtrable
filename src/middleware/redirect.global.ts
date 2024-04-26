export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== '/main') {
      return navigateTo('/main');
    }
  });