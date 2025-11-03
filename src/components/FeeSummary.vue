<template>
  <section class="bg-white shadow rounded-xl p-5">
    <h2 class="text-xl font-semibold mb-4">Result</h2>

    <div class="grid grid-cols-2 gap-2 mb-4">
      <div class="text-sm text-slate-500">Base Price</div>
      <div class="text-right font-medium">{{ money(data.basePrice) }}</div>

      <div class="text-sm text-slate-500">Vehicle Type</div>
      <div class="text-right font-medium">{{ data.vehicleType }}</div>
    </div>

    <div class="border-t border-slate-200 my-3"></div>

    <ul class="space-y-1">
      <li
        v-for="f in data.fees"
        :key="f.name"
        class="flex justify-between text-sm"
      >
        <span>{{ f.name }}</span>
        <span>{{ money(f.amount) }}</span>
      </li>
    </ul>

    <div class="border-t border-slate-200 my-3"></div>

    <div class="flex justify-between text-lg font-bold">
      <span>Total</span>
      <span>{{ money(data.total) }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BidCalculationResponse } from '../types/bid'

defineProps<{ data: BidCalculationResponse }>()

function money(n: number) {
  return n.toLocaleString()
}
</script>
