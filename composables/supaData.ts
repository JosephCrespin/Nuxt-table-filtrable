import { ref, onMounted } from 'vue'
import { SupabaseClient } from '@supabase/supabase-js'

export function useSupabaseData() {
  const supabase = useSupabaseClient()
  const customers = ref([])
  const products = ref([])
  const error = ref(null)

  const loadData = async () => {
    try {
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*');

      if (customerError) throw customerError;
      customers.value = customerData;

      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*');

      if (productError) throw productError;
      products.value = productData;

    } catch (err) {
      error.value = err;
      console.error('Error loading data:', err);
    }
  }

  onMounted(loadData);

  return { customers, products, error };
}
