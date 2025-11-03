<template>
  <form @submit.prevent="onSubmit" class="bg-white shadow rounded-xl p-5 space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">Base price</label>
      <input
        v-model.number="price"
        type="number"
        min="1"
        step="0.01"
        class="w-full rounded-lg border px-3 py-2"
        placeholder="e.g. 1000"
        required
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Vehicle type</label>
      <select
        v-model="type"
        class="w-full rounded-lg border px-3 py-2"
      >
        <option>Common</option>
        <option>Luxury</option>
      </select>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="submit"
        class="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        :disabled="loading"
      >
        {{ loading ? 'Calculating...' : 'Calculate' }}
        
      </button>

      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { calculateBid } from '../api/client'
import type { BidCalculationResponse, VehicleType } from '../types/bid'

const emit = defineEmits<{
  (e: 'calculated', payload: BidCalculationResponse): void
}>()

const price = ref<number>(1000)
const type = ref<VehicleType>('Common')
const loading = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    console.log("the prices is "+price.value + " the type is " + type.value );
    const res: BidCalculationResponse = await calculateBid(price.value, type.value)
    emit('calculated', res)
  } catch (e: any) {
    error.value = e?.message ?? 'Unexpected error'
  } finally {
    loading.value = false
  }
}
</script>
