<script setup>
import BrickBreaker from "@/components/BrickBreaker.vue";
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-gray-200">
    <div class="d-flex justify-center items-center">
      <button id="paused" class="mr-4">Pause</button>
      <button id="start">Start</button>
    </div>
    <BrickBreaker />
  </div>
</template>