<script setup lang="ts">
import { useSupabaseData } from '../../composables/supaData'
const { customers, products} = useSupabaseData()
</script>


<template>
    <div>
      <h1>Clientes</h1>
      <ul>
        <li v-for="customer in customers" :key="customer._id">
          {{ customer.email }} {{ customer.givenName }}
        </li>
      </ul>
      <h1>Productos</h1>
      <ul>
        <li v-for="product in products" :key="product._id">
          {{ product.productName }} - {{ product.mbSpeed || product.gbData }} 
        </li>
      </ul>
    </div>
</template>
  
 ../../composables