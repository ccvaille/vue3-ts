<template>
  <img :src="result && result.message" alt="dog" width="100" />
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AsyncDogShow",
  async setup() {
    const rawData = await axios.get("https://dog.ceo/api/breeds/image/random");
    return {
      result: rawData.data,
    };
  },
});
</script>

<style>
</style>