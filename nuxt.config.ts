
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir:'src',
  modules: ["@nuxtjs/supabase"],
  supabase: {
    redirect: false
  },
})