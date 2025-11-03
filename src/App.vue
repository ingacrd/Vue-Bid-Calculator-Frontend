<template>
  <main class="min-h-screen bg-slate-50 text-slate-800">
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Bid Calculator</h1>
      <BidForm @calculated="onCalculated" />
      <FeeSummary
        v-if="result"
        class="mt-6"
        :data="result"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BidForm from './components/BidForm.vue'
import FeeSummary from './components/FeeSummary.vue'
import type { BidCalculationResponse } from './types/bid'


const result = ref<BidCalculationResponse | null>(null)

function onCalculated(payload: BidCalculationResponse) {
  result.value = payload
}
</script>
