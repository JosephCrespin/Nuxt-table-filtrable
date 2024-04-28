
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir:'src',
  modules: ["@nuxtjs/supabase" , "@nuxtjs/tailwindcss" , "shadcn-nuxt"],
  supabase: {
    redirect: false
  },
  shadcn: {
    componentDir: './src/components/ui'
  },
  components: [{
    path: '@/components', 
    pathPrefix: false
  }],
})