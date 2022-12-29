<script setup>
import { onMounted } from 'vue';
import { initGame } from "@/event/draws";

onMounted(() => {
  const myCanvas = document.getElementById("myCanvas");
  const ctx = myCanvas.getContext("2d");
  initGame(myCanvas, ctx);
});
</script>

<template>
  <div class="bg-gray-600">
    <canvas id="myCanvas" height="320" width="480"></canvas>
  </div>
</template>