<script lang="ts">
import { dogApiInstance } from "@/main";
import DogImgGrid from "@/components/DogImgGrid.component.vue";
import { defineComponent } from "vue";
import type { IDogImg } from "@/interfaces/dogImg.interface";

export default defineComponent({
  name: "BreedView",
  async mounted() {
    const breed: string = this.$route.params.id.toString();
    const dogImgs = await dogApiInstance.getAllByBreed(breed);
    const dogs: IDogImg[] = [];

    for (const dog of dogImgs) {
      const splitBreed = dog.split("/");
      dogs.push({
        id: splitBreed[5].split(".")[0],
        breed: splitBreed[4],
        img: dog,
      });
    }

    this.dogs = dogs;
  },
  data() {
    const dogs: IDogImg[] = [];
    return { dogs };
  },
  components: {
    DogImgGrid,
  },
});
</script>

<template>
  <main>
    <DogImgGrid :dogs="dogs" />
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
}
</style>
