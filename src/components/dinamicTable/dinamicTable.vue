<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSupabaseData } from '../../../composables/supaData'
import { Search ,ArrowUpDown } from 'lucide-vue-next'
const { customers, products } = useSupabaseData()

const searchText = ref('')
const sortOrder = ref('asc')  
const sortColumn = ref('solddate') 

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const customersWithProducts = computed(() => {
  if (!customers.value || !Array.isArray(customers.value)) {
    return []
  }

  // Agrupa productes per customerid
  const productsByCustomerId = products.value.reduce((acc, product) => {
    if (!acc[product.customerid]) {
      acc[product.customerid] = []
    }
    acc[product.customerid].push(product)
    return acc
  }, {})

  // Assigna productes corresponents a cada client
  return customers.value.map(customer => {
    const customerWithProducts = { ...customer }
    customerWithProducts.products = productsByCustomerId[customer.customerid] || []
    return customerWithProducts
  })
})

const filteredCustomers = computed(() => {
  if (!customersWithProducts.value || !Array.isArray(customersWithProducts.value)) {
    return []
  }

  // Aplica filtre de recerca
  let filtered = customersWithProducts.value.filter(customer => {
    const searchLower = searchText.value.toLowerCase()
    return `${customer.customerid} ${customer.givenname} ${customer.familyname1} ${customer.email} ${customer.phone} ${customer.docnum}`
      .toLowerCase()
      .includes(searchLower)
  })

  // Ordena els clients segons la columna seleccionada
  const column = sortColumn.value
  const sortOrderValue = sortOrder.value === 'asc' ? 1 : -1

  filtered.sort((a, b) => {
    const valueA = column === 'solddate' ? new Date(a[column]) : a[column]
    const valueB = column === 'solddate' ? new Date(b[column]) : b[column]
    return sortOrderValue * (valueA - valueB)
  })

  return filtered
})
</script>

<template>

  <div class="flex flex-row justify-between pb-4">
    <div class="relative w-full max-w-sm items-center max-w-[250px]">
      <Input id="search" v-model="searchText" type="text" placeholder="buscar per..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-5 text-muted-foreground" />
      </span>
    </div>
  </div>

  <Table>
    <TableCaption>Llista de clients</TableCaption>
    <TableHeader class="sticky top-0 z-10 bg-base-100 border-b backdrop-blur-sm">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Nom</TableHead>
        <TableHead>Email</TableHead>
        <TableHead><Button @click="toggleSortOrder">Data<ArrowUpDown class="size-4 ml-2" /></Button></TableHead>
        <TableHead>Telèfon</TableHead>
        <TableHead>Document</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody class="max-h-96">
      <TableRow v-for="customer in filteredCustomers" :key="customer._id">
        <TableCell class="font-medium"> {{ customer.customerid }}</TableCell>
        <TableCell> {{ customer.givenname }} {{ customer.familyname1 }}</TableCell>
        <TableCell> {{ customer.email }}</TableCell>
        <TableCell> {{ customer.solddate }}</TableCell>
        <TableCell> {{ customer.phone }}</TableCell>
        <TableCell> <badge class="bg-amber-300">{{ customer.doctype }}</badge> {{ customer.docnum}}</TableCell>
        <Sheet>
          <SheetTrigger>
            <TableCell>
              <Button class="bg-amber-300">Veure productes</Button>
            </TableCell>
          </SheetTrigger>
          <SheetContent  class="min-w-[564px] bg-slate-50">
            <div class="flex flex-col items-center gap-4">
              <div class="flex flex-row w-full justify-between pt-4">
                <p class="font-medium text-base">{{ customer.givenname }} {{ customer.familyname1 }}</p>
                <badge class="bg-amber-300">{{ customer.products.length }} Productes</badge>
              </div>
              <SheetHeader class="w-full" v-for="product in customer.products" :key="product._id">
                <div class="flex flex-col text-center p-4 rounded border border-slate-400 max-w-[564px] items-center">
                  <div class="flex w-full flex-row justify-between">
                    <p>Nom:</p>
                    {{ product.productname }}
                  </div>
                  <div class="flex w-full flex-row justify-between" v-if="product.mbspeed">
                    <p>MbSpeed:</p>
                    {{ product.mbspeed }}
                  </div>
                  <div class="flex w-full flex-row justify-between" v-if="product.gbdata">
                    <p>GbData:</p>
                    {{ product.gbdata }}
                  </div>
                  <div class="flex w-full flex-row justify-between">
                    <p>Número de terminal:</p>
                    {{ product.numeracioterminal }}
                  </div>
                  <div class="flex w-full flex-row justify-between">
                    <p>tipus de producte:</p>
                    {{ product.producttypename }}</div>
                </div>
              </SheetHeader>
            </div>
          </SheetContent>
        </Sheet>
      </TableRow>
    </TableBody>
  </Table>
</template>
