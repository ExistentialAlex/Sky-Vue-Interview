<script lang="ts">
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { useLikesStore } from "@/stores/likes";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DogImg",
  setup() {
    const likesStore = useLikesStore();

    return { likesStore };
  },
  data() {
    return {
      hollowHeart: faHeart,
      solidHeart: fasHeart,
      showFill: false,
      hoverFill: false,
      breedId: this.breed + "__" + this.id,
    };
  },
  props: {
    img: String,
    breed: String,
    id: String,
  },
  components: {
    FontAwesomeIcon,
    FontAwesomeLayers,
  },
  watch: {
    img: "handleImgChange",
  },
  mounted() {
    this.handleImgChange();
  },
  methods: {
    toggleHeart() {
      this.showFill = !this.showFill;
      if (this.showFill) {
        // send message to local storage to store liked state
        this.likesStore.addLike(this.breedId);
      } else {
        this.likesStore.removeLike(this.breedId);
      }
    },
    handleImgChange() {
      this.breedId = this.breed + "__" + this.id;
      if (this.likesStore?.likes?.find((l) => l == this.breedId)) {
        this.showFill = true;
      } else {
        this.showFill = false;
      }
    },
  },
});
</script>

<template>
  <div class="di" v-if="img">
    <div>
      <button
        class="di__heart"
        @mouseenter="hoverFill = !hoverFill"
        @mouseleave="hoverFill = !hoverFill"
        @click="toggleHeart()"
      >
        <font-awesome-layers>
          <font-awesome-icon
            :class="{
              di__solidHeart: true,
              'di__solidHeart--active': showFill || hoverFill,
            }"
            :style="{ color: 'var(--clr-primary)' }"
            :icon="solidHeart"
            size="2x"
          />
          <font-awesome-icon
            :style="{ color: 'var(--bg-dark)' }"
            :icon="hollowHeart"
            size="2x"
          />
        </font-awesome-layers>
      </button>
    </div>
    <img class="di__img" v-bind:src="img" />
  </div>
</template>

<style lang="scss" scoped>
.di {
  position: relative;
  box-shadow: var(--box-shadow);
  background-color: var(--bg);
  padding-bottom: 3rem;

  & > div {
    height: 3rem;
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem;
    background-color: var(--bg);
  }

  &__img {
    width: 100%;
    height: 30rem;
    object-fit: cover;
  }

  &__heart {
    background: none;
    border: none;
    outline: none;
  }

  &__solidHeart {
    opacity: 0;
    transition: opacity 500ms ease;

    &--active {
      opacity: 1;
    }
  }
}
</style>
