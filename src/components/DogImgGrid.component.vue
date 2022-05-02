<script lang="ts">
import DogImg from "@/components/DogImg.component.vue";
import type { IDogImg } from "@/interfaces/dogImg.interface";
import type { PropType } from "vue";
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "DogImgGrid",
  props: {
    dogs: Array as PropType<Array<IDogImg>>,
  },
  components: {
    DogImg,
  },
});
</script>

<template>
  <div class="grid-max-3">
    <DogImg
      v-for="dog of dogs"
      :id="dog.id"
      :breed="dog.breed"
      :img="dog.img"
      :key="dog.id"
    />
  </div>
</template>

<style lang="scss" scoped>
.grid-max-3 {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 500px));
  justify-content: space-evenly;
}
</style>
