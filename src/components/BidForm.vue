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
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
      <p v-else-if="loading" class="text-slate-500 text-sm">Recalculating…</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import debounce from 'lodash.debounce'
import { calculateBid } from '../api/client'
import type { BidCalculationResponse, VehicleType } from '../types/bid'

const emit = defineEmits<{
  (e: 'calculated', payload: BidCalculationResponse): void
}>()

const price = ref<number>(1000)
const type = ref<VehicleType>('Common')
const loading = ref(false)
const error = ref<string | null>(null)

// Abort controller to cancel in-flight fetches
let currentAbort: AbortController | null = null

async function doCalculate(signal?: AbortSignal) {

  if (!price.value || price.value < 0) {
    error.value = "Price must be greater than 0"
    return
  }
  error.value = null
  loading.value = true

  try {
    const res = await calculateBid(price.value, type.value, signal)
    emit('calculated', res)
  } catch (e: any) {
    
    if (e?.name !== 'AbortError') {
      error.value = e?.message ?? 'Unexpected error'
    }
  } finally {
    loading.value = false
  }
}

// Debounce (300 ms).
const debouncedCalc = debounce(() => {
  // cancel previous request
  if (currentAbort) currentAbort.abort()
  currentAbort = new AbortController()
  void doCalculate(currentAbort.signal)
}, 300)

// Recalculate whenever inputs change
watch([price, type], () => debouncedCalc())

async function onSubmit() {}

// initial calculation on mount
onMounted(() => {
  debouncedCalc()
})


</script>
