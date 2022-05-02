<script lang="ts">
import { dogApiInstance } from "@/main";
import DogImgGrid from "@/components/DogimgGrid/DogImgGrid.component.vue";
import { useLikesStore } from "@/stores/likes";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LikesView",
  setup() {
    const likesStore = useLikesStore();
    const dogs = [];

    for (const like of likesStore.likes) {
      const [breed, id] = like.split("__");
      dogs.push({
        id,
        breed,
        img: dogApiInstance.getImgUrl() + `/breeds/${breed}/${id}.jpg`,
      });
    }

    return { likesStore, dogs };
  },
  data() {
    return {};
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
.homeview {
  display: flex;
  flex-direction: column;

  &__btns {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: var(--bg-dark);
    & button {
      color: var(--bg);

      &:hover {
        color: var(--clr-primary);
      }
    }
  }
  &__btn {
    &--active {
      animation: spin 4s linear infinite;
    }
  }

  &--reload {
    opacity: 0.5;
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
